// yashswn007_db_user   NRP7ngA5Y9WrtrA0   mongodb+srv://yashswn007_db_user:NRP7ngA5Y9WrtrA0@cluster0.c60mjw1.mongodb.net/

import express from "express";
import mongoose from "mongoose";
import userRouter from './routes/user.js'
import recipeRouter from "./routes/recipe.js"
import cors from "cors"

const app = express();

app.use(express.json())
app.use(cors({
  origin : true,
  methods : ["GET","POST","PUT","DELETE"],
  credentials : true
}))

// userRouter
app.use('/api',userRouter)

// recipeRouter
app.use('/api',recipeRouter)



mongoose
  .connect(
    "mongodb+srv://yashswn007_db_user:NRP7ngA5Y9WrtrA0@cluster0.c60mjw1.mongodb.net/Recipes",
  )
  .then(() => console.log(`MongoDB is Connected Successfully`))
  .catch((err) => console.log(`Error = `, err.message));

app.listen(3000, () => {
  console.log(`Server is running at Port 3000`);
});
