var express = require('express');
var router = express.Router();
const periodsCtrl = require('../controller/periods')

// all routes are prefixed with "/cycles"

// GET "/periods" - Index Route
router.get('/', periodsCtrl.index);

// GET "/periods/new" - New Route
router.get('/new', periodsCtrl.new);

// POST "/periods" - Create Route
router.post('/', periodsCtrl.create);

module.exports = router;