const Period = require('../models/period');

module.exports = {
  create,
};

function create(req, res) {
  Period.findById(req.params.id, function(err, period) {
    period.notes.push(req.body);
    period.save(function(err) {
      console.log(period);
      res.redirect(`/periods/${period._id}`);
    })
  });

};