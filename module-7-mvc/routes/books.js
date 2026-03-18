// routes/books.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/bookController');
const { bookRules, validate } = require('../middleware/validateBook');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', bookRules, validate, ctrl.create);
router.put('/:id', bookRules, validate, ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;