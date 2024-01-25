import React, { useEffect } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { bindActionCreators } from "redux"
import { RecipeCard, RecipeWrapper } from "./styles"
import * as actions from "../../actions"
import {
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@material-ui/core"

const Recipe = ({ getRecipe, recipe, isLoading, error }) => {
  const { id } = useParams()
  useEffect(() => {
    if (id) {
      getRecipe(id)
    }
  }, [id])

  if (!id) {
    return null
  }
  if (!recipe || isLoading) {
    return <LinearProgress />
  }

  if (error || recipe.error) {
    return (
      <Typography variant="h5">
        There was an error fetching the recipe.
      </Typography>
    )
  }

  return (
    <RecipeWrapper>
      <RecipeCard variant="outlined" raised role="region" aria-label="Recipe Information">
        <Typography variant="h5">{recipe.name}</Typography>
        <Typography variant="h6">Ingredients</Typography>
        <RecipeCard variant="outlined" raised>
          <TableContainer component={Paper} role="table">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Unit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recipe.ingredients.map(({ _id, unit, name, amount }) => (
                  <TableRow key={_id}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{amount}</TableCell>
                    <TableCell>{unit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </RecipeCard>
        <RecipeCard variant="outlined" raised aria-label={`Recipe: ${recipe.name}`}>
          <Typography variant="h6">Instructions:</Typography>
          <Typography variant="body1">{recipe.instructions}</Typography>
        </RecipeCard>
      </RecipeCard>
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
