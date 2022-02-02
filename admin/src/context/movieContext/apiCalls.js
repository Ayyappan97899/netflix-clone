import api from "../../utils/api.config";
import {
  getMoviesSuccess,
  getMoviesFailure,
  deleteMovieSuccess,
  deleteMovieFailure,
  createMovieSuccess,
  createMovieFailure,
  updateMovieSuccess,
  updateMovieFailure,
  getMovieFailure,
  getMovieSuccess,
} from "./MovieActions";

//get movies

export const getMovies = async (loaderDispatch, loaderStart, dispatch) => {
  try {
    loaderDispatch(loaderStart(true));
    const res = await api.get("/movies");
    dispatch(getMoviesSuccess(res.data));
    loaderDispatch(loaderStart(false));
  } catch (err) {
    dispatch(getMoviesFailure());
    loaderDispatch(loaderStart(false));
  }
};

//get movie

export const getMovie = async (loaderDispatch, loaderStart, dispatch, id) => {
  try {
    loaderDispatch(loaderStart(true));
    const res = await api.get("/movies/find/" + id);
    dispatch(getMovieSuccess(res.data));
    loaderDispatch(loaderStart(false));
  } catch (err) {
    dispatch(getMovieFailure());
    loaderDispatch(loaderStart(false));
  }
};

//delete movie

export const deleteMovie = async (dispatch, id) => {
  try {
    const res = await api.delete("/movies/" + id);
    dispatch(deleteMovieSuccess(res.data));
  } catch (err) {
    dispatch(deleteMovieFailure());
  }
};

//create movie

export const createMovie = async (
  loaderDispatch,
  loaderStart,
  movie,
  movieDispatch
) => {
  try {
    loaderDispatch(loaderStart(true));
    const res = await api({
      method: "post",
      url: "/movies/create",
      data: movie,
    });
    loaderDispatch(loaderStart(false));
    movieDispatch(createMovieSuccess(res.data));
  } catch (err) {
    loaderDispatch(loaderStart(false));
    movieDispatch(createMovieFailure());
    console.log(err);
  }
};

//update movie

export const updateMovie = async (
  loaderDispatch,
  loaderStart,
  id,
  movie,
  movieDispatch
) => {
  try {
    loaderDispatch(loaderStart(true));
    const res = await api({
      method: "put",
      url: `/movies/${id}`,
      data: movie,
    });
    loaderDispatch(loaderStart(false));
    movieDispatch(updateMovieSuccess(res.data));
  } catch (err) {
    loaderDispatch(loaderStart(false));
    movieDispatch(updateMovieFailure());
    console.log(err);
  }
};
