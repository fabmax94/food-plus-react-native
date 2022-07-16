const list = (state, { type, recipeList, recipeFilter, search }) => {
  switch (type) {
    case "SET_LIST":
      return { ...state, recipeList, recipeFilter, isLoading: false };
    case "SET_SEARCH":
      return { ...state, search };
    default:
      return state;
  }
};

export { list };
