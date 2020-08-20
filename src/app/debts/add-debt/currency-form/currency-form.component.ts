import { Component, OnInit } from '@angular/core';
import { NestedFormComponent } from '../../../core/models';
import { CurrencyForm } from '../models';
import { FormBuilder, Validators } from '@angular/forms';
import { AppState } from '../../../store';
import { combineLatest, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCurrencyISOs } from '../../../store/common/common.selectors';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss']
})
export class CurrencyFormComponent extends NestedFormComponent<CurrencyForm> implements OnInit {

  currencies$: Observable<string[]>;

  constructor(
    protected fb: FormBuilder,
    private store: Store<AppState>
  ) {
    super(fb);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getCurrencies();
  }

  convertToUppercase(value: string): void {
    this.form.patchValue({currency: value.toUpperCase()});
  }

// tslint:disable-next-line:no-any
  protected getFormGroup(): { [key in keyof CurrencyForm]: any } {
    return {
      currency: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    };
  }

  private getCurrencies(): void {
    this.currencies$ = combineLatest(
      this.store.select(selectCurrencyISOs),
      this.form.valueChanges.pipe(startWith({currency: ''})) as Observable<CurrencyForm>
    ).pipe(
      map(([currencies, {currency}]) => currencies.filter(cur => cur.startsWith(currency?.toUpperCase()))),
    );
  }

}
