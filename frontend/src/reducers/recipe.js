import {
  GET_RECIPE,
  RECEIVE_RECIPE,
  FAIL_RECIPE,
  SELECT_RECIPE,
} from "../actions"

const initialState = {
  recipe: null,
  isLoading: false,
  error: null,
  selectedRecipeId: null,
}

const recipeFetching = (state) => {
  return { ...state, isLoading: true }
}

const recipeFetched = (state, payload) => {
  return { ...state, isLoading: false, recipe: payload }
}

const recipeFailed = (state, payload) => {
  return { ...state, isLoading: false, error: payload }
}

// TODO EB maybe remove all this
const recipeSelected = (state, payload) => {
  return { ...state, selectedRecipeId: payload }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_RECIPE:
      return recipeFetching(state)
    case RECEIVE_RECIPE:
      return recipeFetched(state, payload)
    case FAIL_RECIPE:
      return recipeFailed(state, payload)
    case SELECT_RECIPE:
      return recipeSelected(state, payload)
    default:
      return state
  }
}
