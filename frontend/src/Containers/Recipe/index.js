import React, { useEffect } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { RecipeWrapper } from "./styles"
import * as actions from "../../actions"

const Recipe = ({ selectedRecipeId, getRecipe, recipe, isLoading, error }) => {
  console.log("PROPS", {
    selectedRecipeId,
    getRecipe,
    recipe,
    isLoading,
    error,
  })
  useEffect(() => {
    if (selectedRecipeId) {
      getRecipe(selectedRecipeId)
    }
  }, [selectedRecipeId])

  if (!selectedRecipeId || !recipe) {
    return null
  }
  if (isLoading) {
    // todo change
    return <h1>loading...</h1>
  }
  if (error) {
    return <p>There was an error fetching the recipe.</p>
  }

  return (
    <RecipeWrapper>
      <h3>{recipe.name}</h3>
      <h4>Ingredients:</h4>
      <section>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {recipe.ingredients.map(({ unit, name, amount }) => {
              return (
                <tr>
                  <td>{name}</td>
                  <td>{amount}</td>
                  <td>{unit}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
      <h4>Instructions:</h4>
      <section>{recipe.instructions}</section>
    </RecipeWrapper>
  )
}

const mapStateToProps = (state) => {
  const { recipe } = state
  return { ...recipe }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRecipe: actions.getRecipe,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)
