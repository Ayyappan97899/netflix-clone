//login

export const loginStart = () => ({
  type: "LOGIN_START",
});

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

//register

export const registerStart = () => ({
  type: "REGISTER_START",
});

export const registerSuccess = (data) => ({
  type: "REGISTER_SUCCESS",
  payload: data,
});

export const registerFailure = (msg) => {
  return {
    type: "REGISTER_FAILURE",
    payload: msg,
  };
};
