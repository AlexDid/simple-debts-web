import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddDebtForm, AddDebtNestedForm, AddDebtSteps } from './models';
import { AppState } from '../../store';
import { Store } from '@ngrx/store';
import { DebtAccountType } from '../../store/debts/models';
import * as DebtsActions from '../../store/debts/debts.actions';
import * as ControlsActions from '../../store/controls/controls.actions';
import { NestedFormDataDto, SubscriptionComponent } from '../../core/models';
import { selectDebtSubmittingStatus } from '../../store/debts/debts.selectors';
import { steps } from './data';

@Component({
  selector: 'app-add-debt',
  templateUrl: './add-debt.component.html',
  styleUrls: ['./add-debt.component.scss']
})
export class AddDebtComponent extends SubscriptionComponent implements OnInit, OnDestroy {

  form: AddDebtForm = {
    type: null,
    selectedUser: null,
    userName: '',
    userId: '',
    currency: ''
  };

  showSpinner = false;

  readonly steps: AddDebtSteps[] = steps;

  readonly AddDebtSteps = AddDebtSteps;

  private currentStepIndex = 0;
  private isCurrentStepValid = false;

  constructor(
    private store: Store<AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.setStepTitle();
    this.getSubmittingStatus();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.resetStepTitle();
  }

  get currentStep(): AddDebtSteps {
    return this.steps[this.currentStepIndex];
  }

  get showPrevButton(): boolean {
    return this.currentStepIndex > 0;
  }

  get showNextButton(): boolean {
    return !this.showSubmitButton;
  }

  get showSubmitButton(): boolean {
    return this.currentStep === AddDebtSteps.CONFIRM;
  }

  get enableNextButton(): boolean {
    return this.isCurrentStepValid;
  }

  get isSingleUserDebt(): boolean {
    return this.form.type === DebtAccountType.SINGLE_USER;
  }

  updateForm({value, valid}: NestedFormDataDto<AddDebtNestedForm>): void {
    this.isCurrentStepValid = valid;
    if (this.isCurrentStepValid) {
      this.form = {
        ...this.form,
        ...value
      };
    }
  }

  goToNextStep(): void {
    if (this.showNextButton) {
      this.currentStepIndex++;
      this.setStepTitle();
    }
  }

  goToPrevStep(): void {
    if (this.showPrevButton) {
      this.currentStepIndex--;
      this.setStepTitle();
    }
  }

  submitForm(): void {
    if (this.isSingleUserDebt) {
      this.store.dispatch(DebtsActions.createSingleDebt(this.form));
    } else {
      this.store.dispatch(DebtsActions.createMultipleDebt(this.form));
    }
  }

  private getSubmittingStatus(): void {
    this.store.select(selectDebtSubmittingStatus).pipe(
      this.getTakeUntilPipe()
    ).subscribe(submitting => this.showSpinner = submitting);
  }

  private setStepTitle(): void {
    let headerText: string;

    switch (this.currentStep) {
      case AddDebtSteps.SELECT_DEBT_TYPE:
        headerText = 'Select user type';
        break;
      case AddDebtSteps.SELECT_USER:
        headerText = this.isSingleUserDebt ? 'Type user name' : 'User search';
        break;
      case AddDebtSteps.SELECT_CURRENCY:
        headerText = 'Select currency';
        break;
      case AddDebtSteps.CONFIRM:
        headerText = 'Create debt with this user?';
        break;
    }

    this.store.dispatch(ControlsActions.setHeaderText({headerText}));
  }

  private resetStepTitle(): void {
    this.store.dispatch(ControlsActions.resetHeaderText());
  }

}
