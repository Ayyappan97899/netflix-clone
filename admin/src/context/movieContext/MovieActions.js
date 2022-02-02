//get movies

export const getMoviesSuccess = (movies) => ({
  type: "GET_MOVIES_SUCCESS",
  payload: movies,
});

export const getMoviesFailure = () => ({
  type: "GET_MOVIES_FAILURE",
});

//get movie

export const getMovieSuccess = (movie) => ({
  type: "GET_MOVIE_SUCCESS",
  payload: movie,
});

export const getMovieFailure = () => ({
  type: "GET_MOVIE_FAILURE",
});

//delete movie

export const deleteMovieSuccess = (movie) => ({
  type: "DELETE_MOVIE_SUCCESS",
  payload: movie,
});

export const deleteMovieFailure = () => ({
  type: "DELETE_MOVIE_FAILURE",
});

//create movie

export const createMovieSuccess = (movie) => ({
  type: "CREATE_MOVIE_SUCCESS",
  payload: movie,
});

export const createMovieFailure = () => ({
  type: "CREATE_MOVIE_FAILURE",
});

//update movie

export const updateMovieSuccess = (movie) => ({
  type: "UPDATE_MOVIE_SUCCESS",
  payload: movie,
});

export const updateMovieFailure = () => ({
  type: "UPDATE_MOVIE_FAILURE",
});
