const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Province = new Schema({
  code: { type: 'Number', required: true },
  id: { type: 'string', required: true },
  name: { type: 'string', required: true },
});

module.exports = mongoose.model('Province', Province);
