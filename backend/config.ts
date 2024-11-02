import { augmentConfiguration } from 'unified-deno-config';


export const Config = augmentConfiguration({
  environment: {
    mode: 'development',
  },
  http: {
    port: 8081,
  },
  database: {
    path: '../db/db.kv',
  },
  media: {
    directory: 'media',
    baseUrl: 'http://localhost:8081',
  },
  authentication: {
    verificationTokenStaticCode: '111111',
    verificationTokenLength: 6,
    verificationTokenLifetime: 1000 * 60 * 3,
    registrationTokenLifetime: 1000 * 60 * 3,
    authenticationTokenUnits: 6,
    authenticationTokenLifetime: 1000 * 60 * 60 * 24 * 30,
  },
  authorization: {
    userDefaultPermissions: [ 'user.**' ],
    prepopulateUsers: [
      {
        email: 'yooneskh@gmail.com',
        permissions: [ 'user.**', 'admin.**', 'special.**' ],
      },
    ],
  },
  captcha: {
    length: 5,
    lifetime: 1000 * 60 * 2
  },
  resend: {
    authorization: '',
    from: 'Unified Backend <noreply@mail.khoshghadam.com>',
  },
  brevo: {
    authorization: '',
    sender: {
      name: 'Unified Backend',
      email: 'noreply@khoshghadam.com',
    },
  },
  kavenegar: {
    apiKey: '',
  },
});
