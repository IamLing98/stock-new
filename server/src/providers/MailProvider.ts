import { Connection } from 'mongoose';

import Schema from 'src/models/Mail';

export const MailProvider = [
  {
    provide: 'MAIL_MODEL',
    useFactory: (connection: Connection) => connection.model('Mail', Schema),
    inject: ['DATABASE_CONNECTION'],
  },
];

export default MailProvider;
