var express = require('express');
var router = express.Router();
const periodsCtrl = require('../controller/periods')

// all routes are prefixed with "/periods"

router.get('/', function(req, res, next) {
  const dt = new Date();
  const month = dt.getMonth() + 1;
  const year = dt.getFullYear();
  // periodsCtrl.index
  res.redirect(`/periods/${month}/${year}`);
});

// GET route from above - Index Route
router.get('/:month/:year', periodsCtrl.index)

// GET "/periods/new" - New Route
router.get('/new', periodsCtrl.new);

// POST "/periods" - Create Route
router.post('/', periodsCtrl.create);

// GET "/periods/:id" - Show Route
router.get('/:id', periodsCtrl.show);

// DELETE "/periods/:id" - Delete Route
router.delete('/:id', periodsCtrl.delete);


module.exports = router;