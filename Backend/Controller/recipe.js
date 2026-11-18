import { Recipe } from "../Models/recipe.js";
import { SavedRecipe } from "../Models/SavedRecipe.js";

export const add = async (req, res) => {
  const {
    title,
    instruction,
    ing1,
    ing2,
    ing3,
    ing4,
    qty1,
    qty2,
    qty3,
    qty4,
    imgUrl,
  } = req.body;
  try {
    const recipe = await Recipe.create({title,
    instruction,
    ing1,
    ing2,
    ing3,
    ing4,
    qty1,
    qty2,
    qty3,
    qty4,
    imgUrl,
    user : req.user
  })
    res.json({message : "Recipe Created Successfully",recipe})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

export const getAllRecipe = async (req,res) => {
  try {
    const recipe = await Recipe.find();
    res.json({ recipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getRecipeById = async (req,res) => {
  const id = req.params.id
  try {
    let recipe = await Recipe.findById(id)
    if(!recipe){
      return res.json({message : "The Recipe does not exists !!"})
    }
    res.json({message : "Your recipe is find by id : ",recipe})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

export const getRecipeByUserId = async (req,res) => {
  const userId = req.params.id
  try {
    let recipe = await Recipe.find({user : userId})
    if (!recipe) return res.json({ message: "recipe not exist" })
    res.json({ message: "recipe by userId", recipe })
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

export const getSavedRecipe = async (req,res) => {
  try {
    const recipe = await SavedRecipe.find()
    res.json({recipe})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

export const getSavedRecipeById = async (req,res) => {
  const id = req.params.id
  try {
    let recipe = await SavedRecipe.findOne({recipe:id})
    if(recipe) return res.json({message:"recipe already saved"})
    recipe = await SavedRecipe.create({recipe:id})
    res.json({message:"Recipe saved Successfully..!"})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}