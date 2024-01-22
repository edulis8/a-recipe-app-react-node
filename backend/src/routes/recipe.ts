import { Request, Response } from "express"
import { RecipeModel } from "../models"

interface Query {
  id?: string
}

export const recipeMiddleware = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params
  const query: Query = {}
  query.id = id
  try {
    const foundRecipe = await RecipeModel.findById(id)
    res.send(foundRecipe)
  } catch (error) {
    console.error("Error finding recipe:", error)
    res.status(500).send({ error: "Internal Server Error" })
  }
}
