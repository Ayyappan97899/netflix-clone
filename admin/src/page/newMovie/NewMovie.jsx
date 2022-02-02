import React, { useContext } from "react";
import Container from "@mui/material/Container";
import BasicModal from "../../components/modal/Modal";
import { LoaderContext } from "../../context/loaderContext/LoaderContext";
import { loaderStart } from "../../context/loaderContext/LoaderActions";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { createMovie } from "../../context/movieContext/apiCalls";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./NewMovie.scss";

const NewMovie = () => {
  const history = useHistory();
  const { isLoader, dispatch: loaderDispatch } = useContext(LoaderContext);
  const { dispatch: movieDispatch } = useContext(MovieContext);

  const validationSchema = Yup.object().shape({
    img: Yup.mixed()
      .required()
      .test("file", "The File is required", (value) => {
        return value[0];
      }),
    imgsm: Yup.mixed()
      .required()
      .test("file", "The File is required", (value) => {
        return value[0];
      }),
    title: Yup.string().required(),
    desc: Yup.string().required(),
    year: Yup.string().required(),
    genre: Yup.string().required(),
    duration: Yup.string().required(),
    limit: Yup.number().required(),
    isSeries: Yup.boolean().required(),
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
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("desc", data.desc);
    formData.append("img", data.img[0]);
    formData.append("imgsm", data.imgsm[0]);
    formData.append("trailer", data.trailer[0]);
    formData.append("video", data.video[0]);
    formData.append("year", data.year);
    formData.append("genre", data.genre);
    formData.append("limit", data.limit);
    formData.append("duration", data.duration);
    formData.append("isSeries", data.isSeries);
    await createMovie(loaderDispatch, loaderStart, formData, movieDispatch);
    reset();
    history.push("/movies");
  };

  return isLoader ? (
    <BasicModal state={isLoader} />
  ) : (
    <Container className="newmovie">
      <h1 className="productTitle">New Movie</h1>
      <form className="productForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="item">
          <label
            htmlFor="file"
            className={`${errors.img ? "is-invalid-label" : ""}`}
          >
            Feature Image
          </label>
          <input
            type="file"
            id="file"
            name="img"
            {...register("img")}
            className={`${errors.img ? "is-invalid" : ""}`}
            autoComplete="off"
          />
        </div>
        <div className="item">
          <label
            htmlFor="imgsm"
            className={`${errors.imgsm ? "is-invalid-label" : ""}`}
          >
            Thumbnail Image
          </label>
          <input
            type="file"
            id="imgsm"
            name="imgsm"
            {...register("imgsm")}
            className={`${errors.imgsm ? "is-invalid" : ""}`}
            autoComplete="off"
          />
        </div>

        <div className="item">
          <label className={`${errors.title ? "is-invalid-label" : ""}`}>
            Title
          </label>
          <input
            type="text"
            placeholder="title"
            name="title"
            {...register("title")}
            className={`${errors.title ? "is-invalid" : ""}`}
            autoComplete="off"
          />
        </div>
        <div className="item">
          <label className={`${errors.desc ? "is-invalid-label" : ""}`}>
            Description
          </label>
          <input
            type="text"
            placeholder="description"
            {...register("desc")}
            className={`${errors.desc ? "is-invalid" : ""}`}
            autoComplete="off"
            name="desc"
          />
        </div>
        <div className="item">
          <label className={`${errors.year ? "is-invalid-label" : ""}`}>
            Year
          </label>
          <input
            type="text"
            placeholder="year"
            {...register("year")}
            className={`${errors.year ? "is-invalid" : ""}`}
            autoComplete="off"
            name="year"
          />
        </div>
        <div className="item">
          <label className={`${errors.genre ? "is-invalid-label" : ""}`}>
            Genre
          </label>
          <input
            type="text"
            placeholder="genre"
            {...register("genre")}
            className={`${errors.genre ? "is-invalid" : ""}`}
            autoComplete="off"
            name="genre"
          />
        </div>
        <div className="item">
          <label className={`${errors.duration ? "is-invalid-label" : ""}`}>
            Duration
          </label>
          <input
            type="text"
            placeholder="duration"
            {...register("duration")}
            className={`${errors.duration ? "is-invalid" : ""}`}
            autoComplete="off"
            name="duration"
          />
        </div>
        <div className="item">
          <label className={`${errors.limit ? "is-invalid-label" : ""}`}>
            Limit
          </label>
          <input
            type="text"
            placeholder="limit"
            {...register("limit")}
            className={`${errors.limit ? "is-invalid" : ""}`}
            autoComplete="off"
            name="limit"
          />
        </div>
        <div className="item">
          <label className={`${errors.isSeries ? "is-invalid-label" : ""}`}>
            Is Series?
          </label>
          <select
            defaultValue=""
            name="isSeries"
            id="isSeries"
            {...register("isSeries")}
            className={`${errors.isSeries ? "is-invalid" : ""}`}
          >
            <option value="" disabled hidden>
              Select Type
            </option>
            <option value="false">no</option>
            <option value="true">yes</option>
          </select>
        </div>
        <div className="item">
          <label className={`${errors.trailer ? "is-invalid-label" : ""}`}>
            Trailer
          </label>
          <input
            type="file"
            {...register("trailer")}
            name="trailer"
            className={`${errors.trailer ? "is-invalid" : ""}`}
          />
        </div>
        <div className="item">
          <label className={`${errors.video ? "is-invalid-label" : ""}`}>
            Video
          </label>
          <input
            type="file"
            {...register("video")}
            name="video"
            className={`${errors.video ? "is-invalid" : ""}`}
          />
        </div>

        <button className="createBtn">Create</button>
      </form>
    </Container>
  );
};

export default NewMovie;
