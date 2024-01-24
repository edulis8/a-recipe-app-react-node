export const GET_RECIPE = "GET_RECIPE"
export const RECEIVE_RECIPE = "RECEIVE_RECIPE"
export const FAIL_RECIPE = "FAIL_RECIPE"

const fetchingRecipe = () => ({
  type: GET_RECIPE,
})

const fetchedRecipe = (payload) => {
  return {
    type: RECEIVE_RECIPE,
    payload,
  }
}

const failedRecipe = (payload) => ({
  type: FAIL_RECIPE,
  payload,
})

export const executeGetRecipe = async (id) => {
  const response = await fetch(`/api/recipe/${id}`)
  const recipe = await response.json()
  return recipe
}

export const getRecipe = (id) => {
  return async (dispatch) => {
    dispatch(fetchingRecipe())
    try {
      const res = await executeGetRecipe(id)
      dispatch(fetchedRecipe(res))
    } catch (err) {
      console.error(`Error during recipe fetch:`, err)
      dispatch(failedRecipe(err))
    }
  }
}
