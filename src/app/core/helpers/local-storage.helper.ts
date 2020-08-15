import { FullAuthData } from '../../store/auth/models';

export class LocalStorageHelper {

  static readonly dataKey = 'simpleDebtsUser';

  static writeLoggedUser(authIfo: FullAuthData): void {
    const json = JSON.stringify(authIfo);
    localStorage.setItem(this.dataKey, json);
  }

  static getLoggedUser(): FullAuthData {
    const json = localStorage.getItem(this.dataKey);
    return json ? JSON.parse(json) : null;
  }

  static clearLoggedUser(): void {
    localStorage.removeItem(this.dataKey);
  }
}
