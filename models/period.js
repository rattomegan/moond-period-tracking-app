const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  cramps: {
    type: Number,
    min: 0,
    max: 5,
  },
  backPain: {
    type: Number,
    min: 0,
    max: 5,
  },
  energy: {
    type: Number
  },
  appetite: {
    type: Number,
    min: 0,
    max: 1,
  },
  mood: [String],
  comments: String
});



const periodSchema  = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  phase: {
    type: String,
    enum: ['Bleeding', 'Ovulating', 'Not Bleeding', 'Spotting'],
    default: 'Bleeding'
  },
  periodDate: {
    type: Date,
    default: new Date()
  }, 
  notes: [noteSchema]
})

module.exports = mongoose.model('Period', periodSchema)