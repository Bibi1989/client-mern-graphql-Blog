import React, { createContext, useReducer } from "react";

export const AuthContext = createContext({
  user: null,
  logins: data => {},
  logout: () => {}
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload
      };
    case "LOGOUT":
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};

const initialState = {
  user: null
};

export const AuthProvider = props => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const logins = data => {
    return dispatch({
      type: "LOGIN",
      payload: data
    });
  };

  const logout = () => {
    return dispatch({
      type: "LOGOUT"
    });
  };
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        logins,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
