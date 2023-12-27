const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    phoneNumber: { type: 'number', required: true },
    fullName: { type: 'string', required: true },
    password: { type: 'string', required: true },
    reEnterPassword: { type: 'string', required: true },
    referralCode: { type: 'string' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', User);
