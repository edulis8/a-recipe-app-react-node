import React, { useEffect } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux"
import { RecipeWrapper } from "./styles"
import * as actions from "../../actions"

const Recipe = ({ selectedRecipeId, getRecipe, recipe, isLoading, error }) => {
  const { id } = useParams();
  console.log('useParams id: ', id)
  console.log("PROPS", {
    selectedRecipeId,
    getRecipe,
    recipe,
    isLoading,
    error,
  })

  useEffect(() => {
    if (id) {
      getRecipe(id)
    }
  }, [id])

  if (!id) {
    return null
  }
  if (!recipe || isLoading) {
    // todo change to loader MUI 
    return <h1>loading...</h1>
  }
  if (error || recipe.error) {
    return <p>There was an error fetching the recipe.</p>
  }

  return (
    <RecipeWrapper>
      <h3>{recipe.name}</h3>
      <h4>Ingredients:</h4>
      <section>
        {/* todo eb refactor to use mui */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {recipe.ingredients.map(({ _id, unit, name, amount }) => {
              return (
                <tr key={_id}>
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
