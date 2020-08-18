import { FacebookLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';

const config: SocialAuthServiceConfig = {
  autoLogin: false,
  providers: [
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('657412881122208', {
        scope: 'public_profile,email',
        version: 'v8.0'
      })
    }
  ]
};

export function provideConfig(): SocialAuthServiceConfig {
  return config;
}
