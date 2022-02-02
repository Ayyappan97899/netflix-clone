import React, { useContext, useEffect } from "react";
import Container from "@mui/material/Container";
import BasicModal from "../../components/modal/Modal";
import "./NewList.scss";
import { LoaderContext } from "../../context/loaderContext/LoaderContext";
import { loaderStart } from "../../context/loaderContext/LoaderActions";
import { getMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { createList } from "../../context/listContext/apiCalls";
import { ListContext } from "../../context/listContext/ListContext";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const NewList = () => {
  const history = useHistory();
  const { isLoader, dispatch: loaderDispatch } = useContext(LoaderContext);
  const { dispatch: movieDispatch, movies } = useContext(MovieContext);
  const { dispatch: listDispatch } = useContext(ListContext);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    genre: Yup.string().required(),
    type: Yup.string().required(),
    content: Yup.array().required().min(10),
  });

  useEffect(() => {
    const fetchData = async () => {
      await getMovies(loaderDispatch, loaderStart, movieDispatch);
    };
    fetchData();
  }, [movieDispatch, loaderDispatch]);

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    await createList(loaderDispatch, loaderStart, data, listDispatch);
    reset();
    history.push("/lists");
  };

  return isLoader ? (
    <BasicModal state={isLoader} />
  ) : (
    <Container className="newlist">
      <h1 className="productTitle">New List</h1>
      <form className="productForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="formleft">
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
            <label className={`${errors.genre ? "is-invalid-label" : ""}`}>
              Genre
            </label>
            <input
              type="text"
              placeholder="genre"
              name="genre"
              {...register("genre")}
              className={`${errors.genre ? "is-invalid" : ""}`}
              autoComplete="off"
            />
          </div>
          <div className="item">
            <label className={`${errors.type ? "is-invalid-label" : ""}`}>
              Type
            </label>
            <select
              defaultValue=""
              name="type"
              id="type"
              {...register("type")}
              className={`${errors.type ? "is-invalid" : ""}`}
            >
              <option value="" disabled hidden>
                Select Type
              </option>
              <option value="series">Series</option>
              <option value="movie">Movie</option>
            </select>
          </div>
        </div>
        <div className="formright">
          <div className="item">
            <label className={`${errors.content ? "is-invalid-label" : ""}`}>
              Content
            </label>
            <select
              multiple={true}
              name="content"
              id="content"
              style={{ height: "265px" }}
              {...register("content")}
              className={`${errors.content ? "is-invalid" : ""}`}
            >
              {movies.map((movie) => {
                return (
                  <option key={movie._id} value={movie._id}>
                    {movie.title}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <button className="createBtn">Create</button>
      </form>
    </Container>
  );
};

export default NewList;
