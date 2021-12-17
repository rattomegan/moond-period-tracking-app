const Period = require('../models/period');


module.exports = {
  index,
  new: newPeriod,
  create,
  show
}

function index(req, res) {
  Period.find({}, function(err, periods){
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
    res.render('periods/show', { period });
  })
}
