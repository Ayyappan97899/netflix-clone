import Publish from "@mui/icons-material/Publish";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import { useParams, useHistory } from "react-router-dom";
import { LoaderContext } from "../../context/loaderContext/LoaderContext";
import { loaderStart } from "../../context/loaderContext/LoaderActions";
import { updateMovie, getMovie } from "../../context/movieContext/apiCalls";
import BasicModal from "../../components/modal/Modal";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./Movie.scss";

const Movie = () => {
  const params = useParams();
  const history = useHistory();
  const { dispatch: loaderDispatch, isLoader } = useContext(LoaderContext);
  const { dispatch: movieDispatch, movie: currentMovie } =
    useContext(MovieContext);

  useEffect(() => {
    const fetchData = async () => {
      await getMovie(loaderDispatch, loaderStart, movieDispatch, params.id);
    };
    fetchData();
  }, [loaderDispatch, movieDispatch, params.id]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    year: Yup.string().required(),
    genre: Yup.string().required(),
    limit: Yup.number().required(),
    trailer: Yup.mixed()
      .required()
      .test("file", "The File is required", (value) => {
        return value[0];
      }),
    video: Yup.mixed()
      .required()
      .test("file", "The File is required", (value) => {
        return value[0];
      }),
    imgsm: Yup.mixed()
      .required()
      .test("file", "The File is required", (value) => {
        return value[0];
      }),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    console.log(data);
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("year", data.year);
    formdata.append("genre", data.genre);
    formdata.append("limit", data.limit);
    formdata.append("trailer", data.trailer[0]);
    formdata.append("video", data.video[0]);
    formdata.append("imgsm", data.imgsm[0]);
    console.log(data.trailer[0]);
    await updateMovie(
      loaderDispatch,
      loaderStart,
      currentMovie._id,
      formdata,
      movieDispatch
    );
    reset();
    history.replace("/movies");
  };

  return isLoader ? (
    <BasicModal state={isLoader} />
  ) : (
    <Container className="movie">
      <div className="titleContainer">
        <h1 className="title">Movie</h1>
        <Link to="/newMovies">
          <button className="addBtn">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="right">
          <div className="top">
            <img src={currentMovie.imgsm} alt={currentMovie.title} />
            <span className="productName">{currentMovie.title}</span>
          </div>
          <div className="bottom">
            <div className="item">
              <span className="key">id:</span>
              <span className="value">{currentMovie._id}</span>
            </div>
            <div className="item">
              <span className="key">genre:</span>
              <span className="value">{currentMovie.genre}</span>
            </div>
            <div className="item">
              <span className="key">Year:</span>
              <span className="value">{currentMovie.year}</span>
            </div>
            <div className="item">
              <span className="key">limit:</span>
              <span className="value">{currentMovie.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="formleft">
            <label className={`${errors.title ? "is-invalid-label" : ""}`}>
              Movie Title
            </label>
            <input
              type="text"
              placeholder={currentMovie.title}
              name="title"
              {...register("title")}
              className={`${errors.title ? "is-invalid" : ""}`}
              autoComplete="off"
            />
            <label className={`${errors.year ? "is-invalid-label" : ""}`}>
              Year
            </label>
            <input
              type="text"
              placeholder={currentMovie.year}
              name="year"
              {...register("year")}
              className={`${errors.year ? "is-invalid" : ""}`}
              autoComplete="off"
            />
            <label className={`${errors.genre ? "is-invalid-label" : ""}`}>
              Genre
            </label>
            <input
              type="text"
              placeholder={currentMovie.genre}
              name="genre"
              {...register("genre")}
              className={`${errors.genre ? "is-invalid" : ""}`}
              autoComplete="off"
            />
            <label className={`${errors.limit ? "is-invalid-label" : ""}`}>
              Limit
            </label>
            <input
              type="text"
              placeholder={currentMovie.limit}
              name="limit"
              {...register("limit")}
              className={`${errors.limit ? "is-invalid" : ""}`}
              autoComplete="off"
            />
            <label className={`${errors.trailer ? "is-invalid-label" : ""}`}>
              Trailer
            </label>
            <input
              type="file"
              placeholder={currentMovie.trailer}
              name="trailer"
              {...register("trailer")}
              className={`${errors.trailer ? "is-invalid" : ""}`}
            />
            <label className={`${errors.video ? "is-invalid-label" : ""}`}>
              Video
            </label>
            <input
              type="file"
              name="video"
              {...register("video")}
              className={`${errors.video ? "is-invalid" : ""}`}
            />
          </div>
          <div className="formright">
            <div className="productUpload">
              <img src={currentMovie.imgsm} alt="movie" />
              <label htmlFor="file">
                <Publish
                  className={`icon ${errors.imgsm ? "is-invalid-label" : ""}`}
                />
              </label>
              <input
                type="file"
                style={{ display: "none" }}
                id="file"
                name="imgsm"
                {...register("imgsm")}
              />
            </div>

            <button className="updateBtn">Update</button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Movie;
