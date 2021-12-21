const Period = require('../models/period');

module.exports = {
  create,
  edit,
  update, 
};

function create(req, res) {
  Period.findById(req.params.id, function(err, period) {
    period.notes.push(req.body);
    period.save(function(err) {
      console.log(period.notes);
      res.redirect(`/periods/${period._id}`);
    })
  });

};

function edit(req, res) {
  Period.findOne({ 'notes._id': req.params.id}, function(err, period) {
    let moodsSelected = period.notes[0].mood
    let note = period.notes[0]
    console.log(period.notes[0].mood)
    res.render('periods/edit', { period, note, moodsSelected });
  });
};

function update(req, res) {
  Period.findOne({'notes._id': req.params.id}, function(err, period) {
    let notesSubdoc = period.notes.id(req.params.id)
    console.log(req.body);
    notesSubdoc.flow = req.body.flow;
    notesSubdoc.cramps = req.body.cramps;
    notesSubdoc.backPain = req.body.backPain;
    notesSubdoc.energy = req.body.energy;
    notesSubdoc.appetite = req.body.appetite;
    notesSubdoc.mood = req.body.mood;
    notesSubdoc.comments = req.body.comments;
    period.save(function(err) {
      console.log(period.notes)
      res.redirect(`/periods/${ period._id }`)
    })
  })
}