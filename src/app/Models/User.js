const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    email: { type: 'string', required: true },
    password: { type: 'string', required: true, minLength: 6 },
    firstName: { type: 'string', required: true },
    lastName: { type: 'string', required: true },
    address: { type: 'string' },
    gender: { type: 'string' },
    roleId: { type: 'string' },
    phoneNumber: { type: 'string' },
    positionId: { type: 'string' },
    image: { type: 'string' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', User);
