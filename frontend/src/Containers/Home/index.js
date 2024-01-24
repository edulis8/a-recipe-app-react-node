import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Link } from "react-router-dom"
import { HomeWrapper } from "./styles"
import Input from "@material-ui/core/Input"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import LinearProgress from "@material-ui/core/LinearProgress"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import * as actions from "../../actions"
import Recipe from "../Recipe"
import { ListItemText } from "@material-ui/core"

const ingredientList = ["flour", "sugar", "salt", "butter", "milk"]

class Home extends Component {
  constructor(props) {
    super(props)
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this)
    this.handleIngredient = this.handleIngredient.bind(this)
    this.fetchSearch = this.fetchSearch.bind(this)
    this.selectRecipe = this.selectRecipe.bind(this)
    this.navigateToRecipe = this.navigateToRecipe.bind(this)
    this.state = {
      term: "",
      ingredients: ["milk"],
    }
  }
  fetchSearch(e) {
    e.preventDefault()
    const { term, ingredients } = this.state
    this.props.searchRecipes(term, ingredients)
    // TODO evaluate:
    // find a way to store the results on refresh or back btn press
    // history.push('/search-results')
  }
  selectRecipe(id) {
    // this.props.selectRecipe(id)
    this.navigateToRecipe(id)
  }
  navigateToRecipe(id) {
    const { history } = this.props;
    console.log({id}, {history}, {'this': this})
    history.push(`/recipe/${id}`);
  };
  handleSearchTermChange(event) {
    const term = event.target.value
    this.setState({ term })
  }
  handleIngredient(ingredient, event) {
    const { ingredients } = { ...this.state }
    if (event.target.checked) {
      ingredients.push(ingredient)
    } else {
      const foundIngredient = ingredients.indexOf(ingredient)
      ingredients.splice(foundIngredient, 1)
    }
    this.setState({ ingredients })
  }
  render() {
    const { term, ingredients } = this.state
    const { recipes, isLoading } = this.props
    return (
      <HomeWrapper>
        <form onSubmit={this.fetchSearch}>
          <Input
            autoFocus={true}
            fullWidth={true}
            onChange={this.handleSearchTermChange}
            value={term}
          />
          <div>
            <h3>Ingredients on hand</h3>
            {ingredientList.map((ingredient) => (
              <FormControlLabel
                key={ingredient}
                control={
                  <Checkbox
                    checked={ingredients.includes(ingredient)}
                    onChange={this.handleIngredient.bind(this, ingredient)}
                    value={ingredient}
                  />
                }
                label={ingredient}
              />
            ))}
          </div>
          <Button type="submit">search</Button>
        </form>
        <Divider />
        {recipes && (
          <List>
            {recipes.map((recipe) => (
              <ListItem key={recipe.id}>
                <Link to={`/recipe/${recipe.id}`}>
                  <ListItemText
                    onClick={() => this.selectRecipe(recipe.id)}
                    primary={recipe.name}
                    role="button"
                    tabIndex="0"
                  />
                </Link>
              </ListItem>
            ))}
          </List>
        )}
        {isLoading && <LinearProgress />}
        <Divider />
        {/*
            TODO: Add a recipe component here.
            I'm expecting you to have it return null or a component based on the redux state, not passing any props from here
            I want to see how you wire up a component with connect and build actions.
          */}
        {/* <Recipe /> */}
      </HomeWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const { search } = state
  return { ...search }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      searchRecipes: actions.searchRecipes,
      selectRecipe: actions.selectRecipe,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Home)
