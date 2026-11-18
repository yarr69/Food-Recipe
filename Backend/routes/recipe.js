import express from "express"
import { add, getAllRecipe, getRecipeById, getRecipeByUserId, getSavedRecipe, getSavedRecipeById } from "../Controller/recipe.js";
import { Authenticate } from "../middlewares/auth.js";


const router = express.Router();

// Create the Recipe
router.post('/add',Authenticate,add)

// get all Recipe 
router.get('/',getAllRecipe)

// get all saved recipe
router.get('/saved',getSavedRecipe)

// get Recipies by Id
router.get('/:id',getRecipeById)

// get recipe by UserId
router.get('/user/:id',getRecipeByUserId)

// get saved Recipe by Id
router.post('/:id',getSavedRecipeById)


export default router