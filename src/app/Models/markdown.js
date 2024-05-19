const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Markdown = new Schema(
  {
    contentHTML: { type: 'string', required: true },
    contentMarkdown: { type: 'string', required: true },
    description: { type: 'string' },
    docterId: { type: 'Number', required: true },
    // specialtyId: { type: 'Number', required: true },
    // clinicId: { type: 'Number', required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Markdown', Markdown);
