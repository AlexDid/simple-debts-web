import { Component, OnInit } from '@angular/core';
import { AuthForm } from '../store/auth/models';
import { getAuthFeatureState } from '../store/auth';
import * as AuthActions from '../store/auth/auth.actions';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store';
import { NestedFormDataDto, ReturnUrl, SubscriptionComponent } from '../core/models';
import { selectMergedRoute } from '../store/router/router.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent extends SubscriptionComponent implements OnInit {

  isLoading = false;
  isLogin = true;
  isFormValid = false;
  authForm: AuthForm = {
    email: '',
    password: '',
    passwordConfirm: ''
  };

  private returnUrl: string;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.getQueryParams();
    this.subscribeOnAuthComplete();
  }


  setAuthForm(form: NestedFormDataDto<AuthForm>): void {
    this.authForm = form.value;
    this.isFormValid = form.valid;
  }

  submitForm(): void {
    if (this.isFormValid) {
      this.isLogin ? this.login() : this.signUp();
      this.authForm = {
        ...this.authForm,
        password: '',
        passwordConfirm: ''
      };
    }
  }

  facebookLogin(): void {
    this.store.dispatch(AuthActions.facebookLogin());
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
      select(getAuthFeatureState),
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
    this.store.pipe(
      select(selectMergedRoute),
      this.getTakeUntilPipe()
    )
    .subscribe(({queryParams}) => this.returnUrl = (queryParams as ReturnUrl).returnUrl);
  }
}
