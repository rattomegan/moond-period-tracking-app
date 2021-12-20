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
  Period.findById(req.params.id, function(err, period) {
    let moodOptions = ['Anxious', 'Nervous', 'Tense', 'Depressed', 'Sad', 'Lost', 'Irritated', 'Optimistic', 'Pessimistic', 'Happy', 'I feel nothing.' ]
    let moodsSelected = period.notes[0].mood
    let notes = period.notes
    console.log(period.notes[0].mood)
    res.render('periods/edit', { period, notes, moodOptions, moodsSelected });
  });
};

function update(req, res) {
  Period.findOne({'notes._id': req.params.id}, function(err, period) {
    const notesSubdoc = period.notes.id(req.params.id)
    notesSubdoc = req.body;
    period.save(function(err) {
      res.redirect(`/periods/${ period._id }`)
    })
  })
}