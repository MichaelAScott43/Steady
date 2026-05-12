import { Schema, model } from 'mongoose';

const schema = new Schema({}, { strict: false, timestamps: true });
export const Account = model('Account', schema);
