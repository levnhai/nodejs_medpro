const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Hospital = new Schema({
  fullName: { type: 'string', required: true },
  address: { type: 'string', required: true },
  phoneNumber: { type: 'string' },
  workingTime: { type: 'string' },
  provinceId: { type: 'Number' },
  contentHTML: { type: 'string' },
  contentMarkdown: { type: 'string' },
  image: { type: Buffer, contentType: String },
});

module.exports = mongoose.model('Hospital', Hospital);
