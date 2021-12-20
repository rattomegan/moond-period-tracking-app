const Period = require('../models/period');


module.exports = {
  index,
  new: newPeriod,
  create,
  show,
  delete: deletePeriod,
}

function index(req, res) {
  Period.find({}, function(err, periods){
    console.log(periods)
    res.render('periods/index', { periods });
  })
};

function newPeriod(req, res) {
  res.render('periods/new');
};

function create(req, res ) {
  if (req.body.periodDate === '') delete req.body.periodDate;
  const period = new Period(req.body);
  period.save(function(err) {
    if (err) return res.redirect('/periods/new');
    console.log(period);
    res.redirect('/periods');
  });
};

function show(req,res) {
  Period.findById(req.params.id, function(err, period) {
    let moodOptions = ['Anxious', 'Nervous', 'Tense', 'Depressed', 'Sad', 'Lost', 'Irritated', 'Optimistic', 'Pessimistic', 'Happy', 'I feel nothing.' ]
    res.render('periods/show', { period, moodOptions });
  })
}

function deletePeriod(req, res) {
  Period.findOneAndDelete( {_id: req.params.id }, function(err) {
    res.redirect('/periods');
  })
}
