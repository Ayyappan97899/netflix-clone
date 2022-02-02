const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        login: action.payload,
        errorMsg: "",
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        errorMsg: action.payload,
        error: true,
      };

    default:
      return { ...state };
  }
};

export default AuthReducer;
