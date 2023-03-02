const express = require('express');
const router = express.Router();
const controllers = require('./controllers');


router.get("/", controllers.getIdeas);
router.post('/', controllers.postIdea);
router.put('/:id', controllers.updateIdea);
router.delete('/:id', controllers.deleteIdea);

module.exports = router;