import { createContext, useReducer } from "react";
import Reducer from "./reducer";
import jwt_decode from "jwt-decode";

// access_token that display with login user in local storage
const accessToken = localStorage.getItem("access_token");

const INITIAL_STATE = {
  posts: [],
  user: accessToken ? jwt_decode(accessToken) : null,
  isFetching: false,
  error: false,
  queryTitle: "",
};

// layer the global data
export const Context = createContext(INITIAL_STATE);
console.log(INITIAL_STATE.user);
// console.log(accessToken.user_name);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        posts: state.posts,
        queryTitle: state.queryTitle,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
