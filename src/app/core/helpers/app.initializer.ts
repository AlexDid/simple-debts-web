import { AuthService } from '../services/auth.service';
import { LocalStorageHelper } from './local-storage.helper';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export function appInitializer(authService: AuthService): () => Promise<void> {
  const refreshToken = LocalStorageHelper.getLoggedUser()?.refreshToken;

  if (!refreshToken) {
    return () => new Promise(resolve => resolve());
  }

  return () => new Promise(resolve => {
    // attempt to refresh token on app start up to auto authenticate
    authService
      .refreshToken(refreshToken)
      .pipe(
        catchError(() => of(resolve))
      )
      .subscribe()
      .add(resolve);
  });
}
