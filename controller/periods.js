const res = require('express/lib/response');
const Period = require('../models/period');


module.exports = {
  index,
  new: newPeriod,
  create,
}

function index(req, res) {
  res.render('periods/index');
};

function newPeriod(req, res) {
  res.render('periods/new');
};

function create(req, res ) {
  const period = new Period(req.body);
  period.save(function(err) {
    if (err) return res.redirect('/periods/new');
    console.log(period);
    res.redirect('/periods');
  });

}
