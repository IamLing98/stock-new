import { Connection } from 'mongoose';

import UserSchema from 'src/models/User';

export const userProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

export default userProviders;
