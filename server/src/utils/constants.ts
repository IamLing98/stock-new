const constants = {
  MONGO_URL:
    'mongodb://admin:123qwe!%40%23@27.71.229.34:27017/stock-app?authMechanism=DEFAULT&authSource=admin',
  AUTH_TYPE: {
    NORMAL: 'NORMAL',
    FACEBOOK: 'FACEBOOK',
    GOOGLE: 'GOOGLE',
  },
  ROLES: {
    GUEST: 'GUEST',
    MEMBER: 'MEMBER',
    ADMIN: 'ADMIN',
  },
  ACCOUNT_TYPES: {
    NORMAL: 'NORMAL',
    VIP: 'VIP',
  },
};

export const oauthConfig = {
  GOOGLE_CLIENT_ID: '',
  GOOGLE_CLIENT_SECRET: 'GOOGLE_CLIENT_SECRET',
  GOOGLE_CALLBACK_URL: 'GOOGLE_CALLBACK_URL',
};

export const emailConfig = {
  emailHost: {
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
      user: 'linh.doan01@your.rentals',
      pass: 'Linh@12345',
    },
  },
  defaults: {
    from: '"No Reply" <noreply@example.com>',
  },
};

export default constants;
