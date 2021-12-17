const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const periodSchema  = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  name: {
    type: String,
  },
  periodDate: {
    type: Date,
  }
  
})

module.exports = mongoose.model('Period', periodSchema)