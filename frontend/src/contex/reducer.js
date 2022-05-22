const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
      };
    case "FETCH_POST":
      return {
        ...state,
        posts: action.payload,
      };
    case "TITLE_QUERY":
      return {
        ...state,
        queryTitle: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
