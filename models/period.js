const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Event
const periodSchema  = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  name: {
    type: String,
  },
  periodDate: {
    type: Date,
    default: new Date()
  }

})

module.exports = mongoose.model('Period', periodSchema)