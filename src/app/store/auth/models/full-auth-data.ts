import { AuthUser } from './auth-user';
import { Token } from './token';
import { RefreshToken } from './refresh-token';

export type FullAuthData = AuthUser & Token & RefreshToken;
