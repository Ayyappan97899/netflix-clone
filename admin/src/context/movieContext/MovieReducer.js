const MovieReducer = (state, action) => {
  switch (action.type) {
    case "GET_MOVIES_SUCCESS":
      return {
        ...state,
        movies: action.payload,
        error: false,
      };
    case "GET_MOVIES_FAILURE":
      return {
        ...state,
        error: true,
      };
    case "GET_MOVIE_SUCCESS":
      return {
        ...state,
        movie: action.payload,
        error: false,
      };
    case "GET_MOVIE_FAILURE":
      return {
        ...state,
        error: true,
      };

    case "DELETE_MOVIE_SUCCESS":
      return {
        ...state,
        movies: action.payload,
        error: false,
      };
    case "DELETE_MOVIE_FAILURE":
      return {
        ...state,
        error: true,
      };
    case "CREATE_MOVIE_SUCCESS":
      return {
        ...state,
        movies: action.payload,
        error: false,
      };
    case "CREATE_MOVIE_FAILURE":
      return {
        ...state,
        error: true,
      };
    case "UPDATE_MOVIE_SUCCESS":
      return {
        ...state,
        movies: action.payload,
        error: false,
      };
    case "UPDATE_MOVIE_FAILURE":
      return {
        ...state,
        error: true,
      };

    default:
      return { ...state };
  }
};

export default MovieReducer;
