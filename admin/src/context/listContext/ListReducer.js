const ListReducer = (state, action) => {
  switch (action.type) {
    case "GET_LISTS_SUCCESS":
      return {
        ...state,
        lists: action.payload,
        error: false,
      };
    case "GET_LISTS_FAILURE":
      return {
        ...state,
        error: true,
      };
    case "GET_LIST_SUCCESS":
      return {
        ...state,
        list: action.payload,
        error: false,
      };
    case "GET_LIST_FAILURE":
      return {
        ...state,
        error: true,
      };

    case "DELETE_LIST_SUCCESS":
      return {
        ...state,
        lists: action.payload,
        error: false,
      };
    case "DELETE_LIST_FAILURE":
      return {
        ...state,
        error: true,
      };

    case "CREATE_LIST_SUCCESS":
      return {
        ...state,
        lists: action.payload,
        error: false,
      };
    case "CREATE_LIST_FAILURE":
      return {
        ...state,
        error: true,
      };
    case "UPDATE_LIST_SUCCESS":
      return {
        ...state,
        lists: action.payload,
        error: false,
      };
    case "UPDATE_LIST_FAILURE":
      return {
        ...state,
        error: true,
      };

    default:
      return { ...state };
  }
};

export default ListReducer;
