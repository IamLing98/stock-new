import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Abstract } from './AbtractInterface';

const { Schema, Types, Document } = mongoose;

export interface IUser {
  email: string;
  username: string;
  role: string;
  password: string;
  fullName: string;
  locale: string;
  status: string;
  uuid: string;
  phoneNumber: string;
  lastAccess: Date;
  oauthId: string;
  authType: string;
  accountType: string;
}

export const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    role: String,
    password: String,
    fullName: String,
    locale: String,
    status: Number,
    uuid: String,
    phoneNumber: String,
    lastAccess: Date,
    oauthId: String,
    authType: String,
    accountType: String,
  },
  { timestamps: true, autoCreate: false },
);

UserSchema.pre('save', function (next) {
  console.log('Pre save user:');
  const user = this;

  // Make sure not to rehash the password if it is already hashed
  if (!user.isModified('password')) return next();

  // Generate a salt and use it to hash the user's password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.checkPassword = function (attempt, callback) {
  const user = this;
  bcrypt.compare(attempt, user.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

export function comparePassword(dtoPassword, userPW) {
  return bcrypt.compareSync(dtoPassword, userPW);
}

export default UserSchema;
