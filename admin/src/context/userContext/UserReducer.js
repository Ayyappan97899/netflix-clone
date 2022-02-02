const UserReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS_SUCCESS":
      return {
        users: action.payload,
        user: [],
        error: false,
      };
    case "GET_USERS_FAILURE":
      return {
        users: [],
        user: [],
        error: true,
      };
    case "GET_USER_SUCCESS":
      return {
        ...state,
        user: action.payload,
        error: false,
      };
    case "GET_USER_FAILURE":
      return {
        users: [],
        user: [],
        error: true,
      };

    case "DELETE_USER_SUCCESS":
      return {
        users: action.payload,
        user: [],
        error: false,
      };
    case "DELETE_USER_FAILURE":
      return {
        ...state,
        error: true,
      };
    case "CREATE_USER_SUCCESS":
      return {
        users: action.payload,
        user: [],
        error: false,
      };
    case "CREATE_USER_FAILURE":
      return {
        ...state,
        error: true,
      };
    case "UPDATE_USER_SUCCESS":
      return {
        users: action.payload,
        user: [],
        error: false,
      };
    case "UPDATE_USER_FAILURE":
      return {
        ...state,
        error: true,
      };

    default:
      return { ...state };
  }
};

export default UserReducer;
