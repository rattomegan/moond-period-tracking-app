const express = require('express');
const router = express.Router();
const notesCtrl = require('../controller/notes')


// POST "/periods/:id/notes" - Create Note route
router.post('/:id/notes', notesCtrl.create)