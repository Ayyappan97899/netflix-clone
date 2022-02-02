const LoaderReducer = (state, action) => {
  switch (action.type) {
    case "LOADER":
      return {
        isLoader: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default LoaderReducer;
