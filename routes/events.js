var express = require('express');
var router = express.Router();
const eventsCtrl = require('../controller/events')

// all routes are prefixed with "/cycles"

// GET "/events" - Index Route
router.get('/', eventsCtrl.index);

// GET "/events/new" - New Route
router.get('/new', eventsCtrl.new);

// POST "/events/create" - Create Route


module.exports = router;