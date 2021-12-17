const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  cramps: {
    type: Number,
    min: 0,
    max: 5,
    notes: String,
  },
  energy: {
    type: Number
  },
  backPain: {
    type: Number,
    min: 0,
    max: 5,
    notes: String,
  },
  appetite: {
    type: Number,
    min: 0,
    max: 1,
    notes: String,
  },
  mood: [String],
});



const periodSchema  = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  phase: {
    type: String,
    enum: ['Bleeding', 'Ovulating',],
    default: 'Bleeding'
  },
  periodDate: {
    type: Date,
    default: new Date()
  }, 
  notes: [noteSchema]
})

module.exports = mongoose.model('Period', periodSchema)