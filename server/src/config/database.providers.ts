import * as mongoose from 'mongoose';
import constants from '../utils/constants';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(constants.MONGO_URL, {
        keepAlive: true,
        family: 4, // Use IPv4, skip trying IPv6
      }),
  },
];
