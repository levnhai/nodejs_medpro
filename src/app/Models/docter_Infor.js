const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DocterInfor = new Schema(
  {
    docterId: { type: 'string', required: true },
    priceId: { type: 'string' },
    provinceId: { type: 'string' },
    paymentId: { type: 'string' },
    hospitalId: { type: 'string' },
    roleId: { type: 'string' },
    note: { type: 'string' },
    introduceDocter: { type: 'string' },
    count: { type: 'number' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('DocterInfor', DocterInfor);
