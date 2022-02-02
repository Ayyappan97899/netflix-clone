import api from "../../utils/api.config";
import {
  getListsSuccess,
  getListsFailure,
  deleteListSuccess,
  deleteListFailure,
  createListSuccess,
  createListFailure,
  updateListSuccess,
  updateListFailure,
  getListFailure,
  getListSuccess,
} from "./ListActions";

//get lists

export const getLists = async (loaderDispatch, loaderStart, dispatch) => {
  try {
    loaderDispatch(loaderStart(true));
    const res = await api.get("/lists");
    dispatch(getListsSuccess(res.data));
    loaderDispatch(loaderStart(false));
  } catch (err) {
    dispatch(getListsFailure());
    loaderDispatch(loaderStart(false));
  }
};

//get list

export const getList = async (loaderDispatch, loaderStart, dispatch, id) => {
  try {
    loaderDispatch(loaderStart(true));
    const res = await api.get("/lists/find/" + id);
    dispatch(getListSuccess(res.data));
    loaderDispatch(loaderStart(false));
  } catch (err) {
    dispatch(getListFailure());
    loaderDispatch(loaderStart(false));
  }
};

//delete list

export const deleteList = async (dispatch, id) => {
  try {
    const res = await api.delete("/lists/" + id);
    dispatch(deleteListSuccess(res.data));
  } catch (err) {
    dispatch(deleteListFailure());
  }
};

//create list

export const createList = async (
  loaderDispatch,
  loaderStart,
  list,
  listDispatch
) => {
  try {
    loaderDispatch(loaderStart(true));
    const res = await api({
      method: "post",
      url: "/lists/create",
      data: list,
    });
    listDispatch(createListSuccess(res.data));
    loaderDispatch(loaderStart(false));
  } catch (err) {
    listDispatch(createListFailure());
    loaderDispatch(loaderStart(false));
  }
};

// update list

export const updateList = async (
  loaderDispatch,
  loaderStart,
  id,
  list,
  listDispatch
) => {
  try {
    loaderDispatch(loaderStart(true));
    const res = await api({
      method: "put",
      url: `/lists/${id}`,
      data: list,
    });
    listDispatch(updateListSuccess(res.data));
    loaderDispatch(loaderStart(false));
  } catch (err) {
    listDispatch(updateListFailure());
    loaderDispatch(loaderStart(false));
  }
};
