const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const eventSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  name: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
  }
  
})