//get lists

export const getListsSuccess = (lists) => ({
  type: "GET_LISTS_SUCCESS",
  payload: lists,
});

export const getListsFailure = () => ({
  type: "GET_LISTS_FAILURE",
});

//get list

export const getListSuccess = (list) => ({
  type: "GET_LIST_SUCCESS",
  payload: list,
});

export const getListFailure = () => ({
  type: "GET_LIST_FAILURE",
});

//delete lists

export const deleteListSuccess = (list) => ({
  type: "DELETE_LIST_SUCCESS",
  payload: list,
});

export const deleteListFailure = () => ({
  type: "DELETE_LIST_FAILURE",
});

//create list

export const createListSuccess = (list) => ({
  type: "CREATE_LIST_SUCCESS",
  payload: list,
});

export const createListFailure = () => ({
  type: "CREATE_LIST_FAILURE",
});

//update list

export const updateListSuccess = (list) => ({
  type: "UPDATE_LIST_SUCCESS",
  payload: list,
});

export const updateListFailure = () => ({
  type: "UPDATE_LIST_FAILURE",
});
