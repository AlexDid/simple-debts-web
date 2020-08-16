import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthForm } from '../store/auth/models';
import { getAuthFeatureState } from '../store/auth';
import * as AuthActions from '../store/auth/auth.actions';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store';
import { ActivatedRoute, Router } from '@angular/router';
import { NestedFormDataDto, ReturnUrl, SubscriptionComponent } from '../core/models';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent extends SubscriptionComponent implements OnInit, OnDestroy {

  isLoading = false;
  isLogin = true;
  isFormValid = false;

  error = '';

  private authForm: AuthForm;
  private returnUrl: string;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.getQueryParams();
    this.subscribeOnAuthComplete();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }


  setAuthForm(form: NestedFormDataDto<AuthForm>): void {
    this.authForm = form.value;
    this.isFormValid = form.valid;
  }

  submitForm(): void {
    if (this.isFormValid) {
      this.isLogin ? this.login() : this.signUp();
    }
  }

  toggleFormMode(): void {
    this.isLogin = !this.isLogin;
  }


  private login(): void {
    this.store.dispatch(AuthActions.login(this.authForm));
  }

  private signUp(): void {
    this.store.dispatch(AuthActions.signUp(this.authForm));
  }

  private subscribeOnAuthComplete(): void {
    this.store.pipe(
      select(getAuthFeatureState)
    ).pipe(
      this.getTakeUntilPipe()
    ).subscribe(({user, isLoading}) => {
      this.isLoading = isLoading;
      if (!!user) {
        const redirect = this.returnUrl || '/';
        this.router.navigate([redirect]);
      }
    });
  }

  private getQueryParams(): void {
    this.activatedRoute
      .queryParams
      .pipe(this.getTakeUntilPipe())
      .subscribe(params => this.returnUrl = (params as ReturnUrl).returnUrl);
  }
}
