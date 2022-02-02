const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        isFetching: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        login: action.payload,
        isFetching: false,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loginErrorMsg: action.payload,
        isFetching: false,
        loginError: true,
      };
    case "REGISTER_START":
      return {
        ...state,
        isFetching: true,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        register: action.payload,
        isFetching: false,
      };
    case "REGISTER_FAILURE":
      return {
        ...state,
        registerErrorMsg: action.payload,
        isFetching: false,
        registerError: true,
      };

    default:
      return { ...state };
  }
};

export default AuthReducer;
