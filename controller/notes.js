const Period = require('../models/period');

module.exports = {
  create,
  edit,
  update, 
};

function create(req, res) {
  Period.findById(req.params.id, function(err, period) {
    req.body.userId = req.user._id;
    period.notes.push(req.body);
    period.save(function(err) {
      console.log(period.notes);
      res.redirect(`/periods/${period._id}`);
    })
  });

};

function edit(req, res) {
  Period.findOne({ 'notes._id': req.params.id, 'notes.userId': req.user._id}, function(err, period) {
    let moodsSelected = period.notes[0].mood
    let note = period.notes[0]
    res.render('periods/edit', { period, note, moodsSelected });
  });
};

function update(req, res) {
  Period.findOne({'notes._id': req.params.id, 'notes.userId': req.user._id}, function(err, period) {
    let noteSubdoc = period.notes.id(req.params.id)
    if(err || !period) return res.redirect('/');
    noteSubdoc.flow = req.body.flow;
    noteSubdoc.cramps = req.body.cramps;
    noteSubdoc.backPain = req.body.backPain;
    noteSubdoc.energy = req.body.energy;
    noteSubdoc.appetite = req.body.appetite;
    noteSubdoc.mood = req.body.mood;
    noteSubdoc.comments = req.body.comments;
    period.save(function(err) {
      console.log(period.notes)
      res.redirect(`/periods/${ period._id }`)
    })
  })
}