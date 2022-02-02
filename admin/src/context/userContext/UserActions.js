//get all users

export const getUsersSuccess = (user) => ({
  type: "GET_USERS_SUCCESS",
  payload: user,
});

export const getUsersFailure = () => ({
  type: "GET_USERS_FAILURE",
});

//get user

export const getUserSuccess = (user) => ({
  type: "GET_USER_SUCCESS",
  payload: user,
});

export const getUserFailure = () => ({
  type: "GET_USER_FAILURE",
});

//delete user

export const deleteUserSuccess = (user) => ({
  type: "DELETE_USER_SUCCESS",
  payload: user,
});

export const deleteUserFailure = () => ({
  type: "DELETE_USER_FAILURE",
});

//create user

export const createUserSuccess = (user) => ({
  type: "CREATE_USER_SUCCESS",
  payload: user,
});

export const createUserFailure = () => ({
  type: "CREATE_USER_FAILURE",
});

//update user

export const updateUserSuccess = (user) => ({
  type: "UPDATE_USER_SUCCESS",
  payload: user,
});

export const updateUserFailure = () => ({
  type: "UPDATE_USER_FAILURE",
});
