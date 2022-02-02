import React, { useContext, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import { UserContext } from "../../context/userContext/UserContext";
import { getUsers, deleteUser } from "../../context/userContext/apiCalls";
import "./UserList.scss";
import { LoaderContext } from "../../context/loaderContext/LoaderContext";
import { loaderStart } from "../../context/loaderContext/LoaderActions";
import BasicModal from "../../components/modal/Modal";

const UserList = () => {
  const { dispatch, users } = useContext(UserContext);
  const { dispatch: loaderDispatch, isLoader } = useContext(LoaderContext);

  useEffect(() => {
    const fetchData = async () => {
      await getUsers(loaderDispatch, loaderStart, dispatch);
    };
    fetchData();
  }, [loaderDispatch, dispatch]);

  const deleteHandler = (id) => {
    deleteUser(dispatch, id);
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="username">
            <img
              src={
                params.row.profile ||
                "https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"
              }
              alt="profile"
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "IsAdmin",
      width: 150,
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{ pathname: "/users/" + params.row._id }}>
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
    <Container className="userlist">
      <DataGrid
        rows={users}
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

export default UserList;
