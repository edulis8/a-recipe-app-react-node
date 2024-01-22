export const GET_SEARCH = "GET_SEARCH"
export const RECEIVE_SEARCH = "RECEIVE_SEARCH"
export const FAIL_SEARCH = "FAIL_SEARCH"

const fetchingSearch = () => ({
  type: GET_SEARCH,
})

const fetchedSearch = (payload) => {
  console.log('RECEIVE_SEARCH, in action', {payload})
  return {
    type: RECEIVE_SEARCH,
    payload,
  }
}

const failedSearch = (payload) => ({
  type: FAIL_SEARCH,
  payload,
})

export const executeSearch = async (name, ingredients) => {
  const response = await fetch("/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, ingredients }),
  })
  const searchResults = await response.json()
  return searchResults
}

// TODO, del consoles
export const searchRecipes = (name, ingredients) => {
  return (dispatch) => {
    console.log('Dispatching fetchingSearch action');
    dispatch(fetchingSearch());
    return executeSearch(name, ingredients)
      .then((res) => {
        console.log('Dispatching fetchedSearch action with result:', res);
        dispatch(fetchedSearch(res));
      })
      .catch((err) => {
        console.error('Error during search:', err);
        dispatch(failedSearch(err));
      });
  };
};
