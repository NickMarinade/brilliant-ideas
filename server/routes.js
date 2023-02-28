const express = require('express');
const router = express.Router();

router.get('/', controllers.getIdeas);
router.post('/add', controllers.postIdea);
router.put('/:id', controllers.updateIdea);
router.delete('/:id', controllers.deleteIdea);

  module.exports = router;