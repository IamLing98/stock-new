import * as mongoose from 'mongoose';

const { Schema, Types, Document } = mongoose;

export interface IMail {
  to: string;
  subject: string;
  template: string;
  context: {
    name: string;
    url: string;
  };
}

export const MailSchema = new Schema({
  to: {
    type: String,
    required: true,
    unique: true,
  },
  subject: {
    type: String,
    required: true,
    unique: true,
  },
  template: String,
  context: {
    name: String,
    url: String,
  },
});

export default MailSchema;
