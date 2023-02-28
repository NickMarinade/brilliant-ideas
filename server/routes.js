const express = require('express');
const router = express.Router();

router.get('/', getIdeas);
router.post('/add', postIdea);
router.put('/:id', updateIdea);
router.delete('/:id', deleteIdea);

module.exports = router;