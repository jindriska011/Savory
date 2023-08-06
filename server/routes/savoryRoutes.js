const express = require('express');
const router = express.Router();
const savoryController = require('../controllers/savoryController');

router.get('/', savoryController.homepage);
router.get('/categories', savoryController.exploreCategories);
router.get('/explorelatest', savoryController.exploreLatest);
router.get('/recipe', savoryController.displayRandom);
router.get('/submitrecipe', savoryController.submitRecipe);
router.get('/recipe/:id', savoryController.displayRecipe);
router.get('/category/:id', savoryController.displayCategory);
router.get('/categories/:id', savoryController.displayCategory);


module.exports = router;