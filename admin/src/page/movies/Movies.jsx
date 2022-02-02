import React, { useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import "./Movies.scss";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getMovies } from "../../context/movieContext/apiCalls";
import { deleteMovie } from "../../context/movieContext/apiCalls";
import { LoaderContext } from "../../context/loaderContext/LoaderContext";
import { loaderStart } from "../../context/loaderContext/LoaderActions";
import BasicModal from "../../components/modal/Modal";

const Movies = () => {
  const { movies, dispatch } = useContext(MovieContext);
  const { dispatch: loaderDispatch, isLoader } = useContext(LoaderContext);

  useEffect(() => {
    getMovies(loaderDispatch, loaderStart, dispatch);
  }, [dispatch, loaderDispatch]);

  const deleteHandler = (id) => {
    deleteMovie(dispatch, id);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Movies",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productname">
            <img src={params.row.imgsm} alt="product" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "limit", headerName: "Limit", width: 120 },
    { field: "isSeries", headerName: "isSeries", width: 120 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{ pathname: "/movies/" + params.row._id }}>
              <button className="editBtn">Edit</button>
            </Link>

            <DeleteOutlineIcon
              className="deleteBtn"
              onClick={() => deleteHandler(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return isLoader ? (
    <BasicModal state={isLoader} />
  ) : (
    <Container className="movies">
      <DataGrid
        rows={movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </Container>
  );
};

export default Movies;
