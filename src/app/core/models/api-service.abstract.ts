import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

export abstract class ApiServiceAbstract {
  protected readonly baseUrl = environment.API_URL;
  abstract readonly urlPath: string;

  constructor(
    protected http: HttpClient
  ) {}

  get url(): string {
    return `${this.baseUrl}/${this.urlPath}`;
  }
}
