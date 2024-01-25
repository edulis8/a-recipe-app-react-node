import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Link, useParams } from "react-router-dom"
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
import { ListItemText } from "@material-ui/core"

const ingredientList = ["flour", "sugar", "salt", "butter", "milk"]

const Home = ({ searchRecipes, recipes, isLoading }) => {
  const { term: routeTerm, ingredients: routeIngredients } = useParams();
  const [term, setTerm] = useState("");
  const [ingredients, setIngredients] = useState(["milk"]);

  useEffect(() => {
    if (routeTerm || routeIngredients) {
      const searchTerm = routeTerm || " ";
      const searchIngredients = routeIngredients ? routeIngredients.split(",") : []
      setTerm(searchTerm);
      setIngredients(searchIngredients);
      searchRecipes(searchTerm, searchIngredients);
    }
  }, [routeTerm, routeIngredients, searchRecipes]);

  const fetchSearch = (e) => {
    e.preventDefault();
    window.location.hash = `#/${term}/${ingredients.join(",")}`;
    searchRecipes(term, ingredients);
  };

  const handleSearchTermChange = (event) => {
    const term = event.target.value;
    setTerm(term);
  };

  const handleIngredient = (ingredient, event) => {
    const updatedIngredients = event.target.checked
      ? [...ingredients, ingredient]
      : ingredients.filter((ing) => ing !== ingredient);
    setIngredients(updatedIngredients);
  };

  return (
    <HomeWrapper>
      <h1>Recipe Search</h1>
      <form onSubmit={fetchSearch}>
        <Input autoFocus fullWidth onChange={handleSearchTermChange} value={term} />
        <div>
          <h3>Ingredients on hand</h3>
          {ingredientList.map((ingredient) => (
            <FormControlLabel
              key={ingredient}
              control={
                <Checkbox
                  checked={ingredients.includes(ingredient)}
                  onChange={(e) => handleIngredient(ingredient, e)}
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
                <ListItemText primary={recipe.name} role="button" tabIndex="0" />
              </Link>
            </ListItem>
          ))}
        </List>
      )}
      {isLoading && <LinearProgress />}
      <Divider />
      {/* Recipe component handled via router */}
    </HomeWrapper>
  );
};

const mapStateToProps = (state) => {
  const { search } = state;
  return { ...search };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      searchRecipes: actions.searchRecipes,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);