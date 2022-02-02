import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import { useParams, useHistory } from "react-router-dom";
import { LoaderContext } from "../../context/loaderContext/LoaderContext";
import { loaderStart } from "../../context/loaderContext/LoaderActions";
import "./MovieList.scss";
import BasicModal from "../../components/modal/Modal";
import { updateList } from "../../context/listContext/apiCalls";
import { ListContext } from "../../context/listContext/ListContext";
import { getList } from "../../context/listContext/apiCalls";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const MovieList = () => {
  const history = useHistory();
  const params = useParams();
  const { dispatch: loaderDispatch, isLoader } = useContext(LoaderContext);
  const { dispatch: listDispatch, list: currentList } = useContext(ListContext);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    genre: Yup.string().required(),
    type: Yup.string().required(),
  });

  useEffect(() => {
    const fetchData = async () => {
      await getList(loaderDispatch, loaderStart, listDispatch, params.id);
    };
    fetchData();
  }, [loaderDispatch, listDispatch, params.id]);

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    await updateList(
      loaderDispatch,
      loaderStart,
      currentList._id,
      data,
      listDispatch
    );
    reset();
    history.push("/lists");
  };

  return isLoader ? (
    <BasicModal state={isLoader} />
  ) : (
    <Container className="movielist">
      <div className="titleContainer">
        <h1 className="title">List</h1>
        <Link to="/newList">
          <button className="addBtn">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="right">
          <div className="top">
            <span className="productName">{currentList.title}</span>
          </div>
          <div className="bottom">
            <div className="item">
              <span className="key">id:</span>
              <span className="value">{currentList._id}</span>
            </div>
            <div className="item">
              <span className="key">genre:</span>
              <span className="value">{currentList.genre}</span>
            </div>
            <div className="item">
              <span className="key">Type:</span>
              <span className="value">{currentList.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="formleft">
            <label className={`${errors.title ? "is-invalid-label" : ""}`}>
              List Title
            </label>
            <input
              type="text"
              placeholder={currentList.title}
              name="title"
              {...register("title")}
              className={`${errors.title ? "is-invalid" : ""}`}
              autoComplete="off"
            />

            <label className={`${errors.genre ? "is-invalid-label" : ""}`}>
              Genre
            </label>
            <input
              type="text"
              placeholder={currentList.genre}
              name="genre"
              {...register("genre")}
              className={`${errors.genre ? "is-invalid" : ""}`}
              autoComplete="off"
            />
            <label className={`${errors.type ? "is-invalid-label" : ""}`}>
              Type
            </label>
            <select
              defaultValue=""
              placeholder={currentList.type}
              name="type"
              {...register("type")}
              className={`${errors.type ? "is-invalid" : ""}`}
            >
              <option value="" disabled hidden>
                Select Type
              </option>
              <option value="series">Series</option>
              <option value="movie">Movie</option>
            </select>
            <button className="updateBtn">Update</button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default MovieList;
