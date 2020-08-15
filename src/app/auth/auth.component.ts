import { Component, OnInit } from '@angular/core';
import { AuthForm } from '../store/auth/models';
import { getAuthFeatureState, login, signUp } from '../store/auth';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store';
import { ActivatedRoute, Router } from '@angular/router';
import { NestedFormDataDto } from '../core/models/nested-form-data.dto';
import { ReturnUrl } from '../core/models/query-params/return-url';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

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
  ) { }

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
    }
  }

  toggleFormMode(): void {
    this.isLogin = !this.isLogin;
  }


  private login(): void {
    this.store.dispatch(login(this.authForm));
  }

  private signUp(): void {
    this.store.dispatch(signUp(this.authForm));
  }

  private subscribeOnAuthComplete(): void {
    this.store.pipe(
      select(getAuthFeatureState)
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
      .subscribe(params => this.returnUrl = (params as ReturnUrl).returnUrl);
  }
}
