/* TODO: create recipe fetch actions, creators, and constants
  API: use /api/recipe/:id as a get request to fetch the recipe info
*/

export const GET_RECIPE = "GET_RECIPE"
export const RECEIVE_RECIPE = "RECEIVE_RECIPE"
export const FAIL_RECIPE = "FAIL_RECIPE"

const fetchingRecipe = () => ({
  type: GET_RECIPE,
})

const fetchedRecipe = (payload) => {
  console.log("RECEIVE_RECIPE, in action", { payload })
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

// TODO, del consoles
export const getRecipe = (id) => {
  return async (dispatch) => {
    console.log("Dispatching fetchingRecipe action")
    dispatch(fetchingRecipe())
    try {
      const res = await executeGetRecipe(id)
      console.log(
        "Dispatching fetchedRecipe action with result:",
        JSON.stringify(res, null, 2)
      )
      dispatch(fetchedRecipe(res))
    } catch (err) {
      console.error("Error during search:", err)
      dispatch(failedRecipe(err))
    }
  }
}
