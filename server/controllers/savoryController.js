require('../models/database');
const Category = require('../models/Category'); 
const Recipe = require('../models/Recipe');

exports.homepage = async(req, res) => {
    try {
        const displayMaxNumber = 5;
        const categories = await Category.find({}).limit(displayMaxNumber);
        const latest = await Recipe.find({}).sort({_id: -1}).limit(displayMaxNumber-1);
        const italian = await Recipe.find({'category': 'Italian'}).limit(displayMaxNumber-1);
        const french = await Recipe.find({'category': 'French'}).limit(displayMaxNumber-1);
        const american = await Recipe.find({'category': 'American'}).limit(displayMaxNumber-1);
        const food = {latest, french, american, italian};
        res.render('index', {title: 'Savory Blog | Homepage', categories, food});
    } catch (error) {
        res.status(500).send({message:error.message || 'An error occured'});
    }
}

exports.exploreCategories = async(req, res) => {
    try {
        const categories = await Category.find({});
        res.render('categories', {title: 'Savory Blog | Categories', categories});
    } catch (error) {
        res.status(500).send({message:error.message || 'An error occured'});
    }
}

exports.exploreLatest = async(req, res) => {
    try {
        const displayMaxNumber = 12;
        const recipes = await Recipe.find({}).sort({_id: -1}).limit(displayMaxNumber);
        res.render('explorelatest', {title: 'Savory Blog | Latest Recipes', recipes});
    } catch (error) {
        res.status(500).send({message:error.message || 'An error occured'});
    }
}

exports.displayCategory = async(req, res) => {
    try {
        let category = req.params.id;
        const selectedCategory = await Category.findById(category);
        const selected = await Recipe.find({
            category: selectedCategory.name,
        })
        res.render('category', {title: 'Savory Blog | category', selected});
    } catch (error) {
        res.status(500).send({message:error.message || 'An error occured'});
    }
}

exports.displayRecipe = async(req, res) => {
    try {
        let recipeId = req.params.id;
        const selected = await Recipe.findById(recipeId);
        res.render('recipe', {title: 'Savory Blog | Recipe', selected});
    } catch (error) {
        res.status(500).send({message:error.message || 'An error occured'});
    }
}

exports.displayRandom = async(req, res) => {
    try {
        const recipes = await Recipe.find({})
        const random = Math.floor(Math.random() * recipes.length);
        const selected = recipes[random];
        res.render('recipe', {title: 'Savory Blog | A Random Recipe', selected});
    } catch (error) {
        res.status(500).send({message:error.message || 'An error occured'});
    }
}

exports.submitRecipe = async(req, res) => {
    try {
        res.render('submitrecipe', {title: 'Savory Blog | Submit'});
    } catch (error) {
        res.status(500).send({message:error.message || 'An error occured'});
    }
}










