import { Component, OnInit } from '@angular/core';
import { CreateOperationDto, Debt } from '../../../store/debts/models';
import { NestedFormComponent, User } from '../../../core/models';
import { Store } from '@ngrx/store';
import { selectCreateOperationStatus, selectSelectedDebt } from '../../../store/debts/debts.selectors';
import { FormBuilder, Validators } from '@angular/forms';
import { selectUserInfo } from '../../../store/auth';
import { addOperation } from '../../../store/debts/debts.actions';

@Component({
  selector: 'app-add-operation',
  templateUrl: './add-operation.component.html',
  styleUrls: ['./add-operation.component.scss']
})
export class AddOperationComponent extends NestedFormComponent<CreateOperationDto> implements OnInit {

  debt: Debt;
  user: User;

  showSpinner = false;

  constructor(
    protected fb: FormBuilder,
    private store: Store
  ) {
    super(fb);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getSelectedDebt();
    this.getCurrentUser();
    this.getSpinner();
  }

  get currentUserId(): string {
    return this.user?.id;
  }

  get debtUserId(): string {
    return this.debt?.user?.id;
  }

  get debtCurrency(): string {
    return this.debt?.currency || '';
  }

  get selectedMoneyReceiver(): string {
    return this.form.get('moneyReceiver' as keyof CreateOperationDto).value;
  }

  selectMoneyReceiver(moneyReceiver: string): void {
    this.form.patchValue({
      moneyReceiver
    } as CreateOperationDto);
  }

  submitForm(): void {
    if (this.form.valid && !this.showSpinner) {
      this.store.dispatch(addOperation(this.form.value));
    }
  }

  // tslint:disable-next-line:no-any
  protected getFormGroup(): { [key in keyof CreateOperationDto]: any } {
    return {
      debtsId: [null, Validators.required],
      moneyReceiver: [null, Validators.required],
      moneyAmount: [null, [Validators.required, Validators.min(0)]],
      description: [null, [Validators.required, Validators.minLength(3)]]
    };
  }

  private getSelectedDebt(): void {
    this.store.select(selectSelectedDebt).pipe(
      this.getTakeUntilPipe()
    ).subscribe(debt => {
      this.debt = debt;
      this.form.patchValue({
        debtsId: debt?.id
      } as Partial<CreateOperationDto>);
    });
  }

  private getCurrentUser(): void {
    this.store.select(selectUserInfo).pipe(
      this.getTakeUntilPipe()
    ).subscribe(user => this.user = user);
  }

  private getSpinner(): void {
    this.store.select(selectCreateOperationStatus).pipe(
      this.getTakeUntilPipe()
    ).subscribe(spinner => this.showSpinner = spinner);
  }

}
