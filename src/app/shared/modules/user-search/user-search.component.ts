import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { NestedFormComponent, User } from '../../../core/models';
import { UserSearchForm } from './models';
import { catchError, debounceTime, distinctUntilChanged, exhaustMap, filter, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent extends NestedFormComponent<UserSearchForm> implements OnInit {

  users$: Observable<User[]>;

  showSpinner = false;

  constructor(
    protected fb: FormBuilder,
    private userService: UserService
  ) {
    super(fb);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.setUsersSearch();
  }

  selectUser(user: User): void {
    this.form.get('name' as keyof UserSearchForm).patchValue(user.name, { emitEvent: false });
    this.form.get('userId' as keyof UserSearchForm).patchValue(user.id);
    this.form.get('selectedUser' as keyof UserSearchForm).patchValue(user);
  }

  // tslint:disable-next-line:no-any
  protected getFormGroup(): { [key in keyof UserSearchForm]: any } {
    return {
      name: ['', Validators.required],
      userId: ['', Validators.required],
      selectedUser: [null, Validators.required]
    };
  }

  private setUsersSearch(): void {
    this.users$ = this.form.get('name' as keyof UserSearchForm).valueChanges.pipe(
      filter(name => typeof name === 'string'),
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.showSpinner = true),
      tap(() => this.resetUser()),
      exhaustMap(name => this.userService.searchUsers(name).pipe(
        tap(() => this.showSpinner = false),
        map(users => users || []),
        catchError(() => of([]))
      ))
    );
  }

  private resetUser(): void {
    this.form.patchValue({
      userId: '',
      user: null
    } as Partial<UserSearchForm>);
  }
}
