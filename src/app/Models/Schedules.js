const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Schedules = new Schema(
  {
    currentNumber: { type: 'Number' },
    maxNumber: { type: 'Number' },
    date: { type: 'string' },
    timeType: { type: 'string' },
    docterId: { type: 'string' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Schedules', Schedules);
