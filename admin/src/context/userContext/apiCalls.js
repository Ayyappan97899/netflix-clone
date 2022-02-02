import api from "../../utils/api.config";
import {
  getUsersSuccess,
  getUsersFailure,
  deleteUserSuccess,
  deleteUserFailure,
  createUserSuccess,
  createUserFailure,
  updateUserSuccess,
  updateUserFailure,
  getUserFailure,
  getUserSuccess,
} from "./UserActions";

//get all users

export const getUsers = async (loaderDispatch, loaderStart, dispatch) => {
  try {
    loaderDispatch(loaderStart(true));
    const res = await api.get("/users");
    dispatch(getUsersSuccess(res.data));
    loaderDispatch(loaderStart(false));
  } catch (err) {
    dispatch(getUsersFailure());
    loaderDispatch(loaderStart(false));
  }
};

//get user

export const getUser = async (loaderDispatch, loaderStart, dispatch, id) => {
  try {
    loaderDispatch(loaderStart(true));
    const res = await api.get("/users/find/" + id);
    dispatch(getUserSuccess(res.data));
    loaderDispatch(loaderStart(false));
  } catch (err) {
    dispatch(getUserFailure());
    loaderDispatch(loaderStart(false));
  }
};

//delete user

export const deleteUser = async (dispatch, id) => {
  try {
    const res = await api.delete("/users/" + id);
    dispatch(deleteUserSuccess(res.data));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

//create user

export const createUser = async (
  loaderDispatch,
  loaderStart,
  user,
  userDispatch
) => {
  try {
    loaderDispatch(loaderStart(true));
    const res = await api({
      method: "post",
      url: "/users/create",
      data: user,
    });
    userDispatch(createUserSuccess(res.data));
    loaderDispatch(loaderStart(false));
  } catch (err) {
    userDispatch(createUserFailure());
    loaderDispatch(loaderStart(false));
  }
};

//update user

export const updateUser = async (
  loaderDispatch,
  loaderStart,
  id,
  user,
  userDispatch
) => {
  try {
    loaderDispatch(loaderStart(true));
    const res = await api({
      method: "put",
      url: `/users/${id}`,
      data: user,
    });
    userDispatch(updateUserSuccess(res.data));
    loaderDispatch(loaderStart(false));
  } catch (err) {
    userDispatch(updateUserFailure());
    loaderDispatch(loaderStart(false));
  }
};
