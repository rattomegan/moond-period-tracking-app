const res = require('express/lib/response');
const Event = require('../models/event');


module.exports = {
  index,
  new: newEvent,
}

function index(req, res) {
  res.render('events/index');
};

function newEvent(req, res) {
  res.render('events/new');
};
