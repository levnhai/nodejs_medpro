const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Docter = new Schema(
  {
    email: { type: 'string', required: true },
    password: { type: 'string', required: true },
    fullName: { type: 'string', required: true },
    reEnterPassword: { type: 'string', required: true },
    address: { type: 'string', required: true },
    gender: { type: 'string', required: true },
    roleId: { type: 'string', required: true },
    phoneNumber: { type: 'number', required: true },
    positionId: { type: 'string', required: true },
    image: { type: Buffer, contentType: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Docter', Docter);
