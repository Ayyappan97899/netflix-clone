//login

export const loginSuccess = (data) => ({
  type: "LOGIN_SUCCESS",
  payload: data,
});

export const loginFailure = (msg) => {
  return {
    type: "LOGIN_FAILURE",
    payload: msg,
  };
};
