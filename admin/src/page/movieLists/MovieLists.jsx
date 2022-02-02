import React, { useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import "./MovieLists.scss";
import { getLists, deleteList } from "../../context/listContext/apiCalls";
import { ListContext } from "../../context/listContext/ListContext";
import { LoaderContext } from "../../context/loaderContext/LoaderContext";
import { loaderStart } from "../../context/loaderContext/LoaderActions";
import BasicModal from "../../components/modal/Modal";

const MovieLists = () => {
  const { lists, dispatch } = useContext(ListContext);
  const { dispatch: loaderDispatch, isLoader } = useContext(LoaderContext);
  useEffect(() => {
    const fetchData = async () => {
      getLists(loaderDispatch, loaderStart, dispatch);
    };
    fetchData();
  }, [loaderDispatch, dispatch]);

  const deleteHandler = (id) => {
    deleteList(dispatch, id);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "title", headerName: "Title", width: 250 },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "type", headerName: "Type", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{ pathname: "/list/" + params.row._id }}>
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
    <Container className="movielists">
      <DataGrid
        rows={lists}
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

export default MovieLists;
