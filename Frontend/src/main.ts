import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config.js';
import { App } from './app/app.js';
import { configuration } from './environments/environment.js';
import { Amplify } from 'aws-amplify';

Amplify.configure(
  {
    Auth: {
      Cognito: {
        userPoolId: configuration.awsCognitoSettings.userPoolId,
        userPoolClientId: configuration.awsCognitoSettings.clientId
      }
    }
  }
);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
