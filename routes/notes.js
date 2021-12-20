const express = require('express');
const router = express.Router();
const notesCtrl = require('../controller/notes')


// POST "/periods/:id/notes" - Create Note route
router.post('/periods/:id/notes', notesCtrl.create)

// GET "/periods/:id" - Edit Note Route
router.get('/notes/:id/edit', notesCtrl.edit)

// PUT "/periods/:id" - Update Route
router.put('/notes/:id', notesCtrl.update)

module.exports = router;