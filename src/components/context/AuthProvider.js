import React, { createContext, useReducer } from "react";
import jwt from "jwt-decode";

const initialState = {
  user: null
};

if (sessionStorage.getItem("auth")) {
  const decoded = jwt(JSON.parse(sessionStorage.getItem("auth")));
  if (decoded.exp * 1000 < Date.now()) {
    sessionStorage.removeItem("auth");
  } else {
    initialState.user = decoded;
  }
}

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

export const AuthProvider = props => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const logins = data => {
    let token = data.token;
    sessionStorage.setItem("auth", JSON.stringify(`${token}`));
    sessionStorage.setItem("users", JSON.stringify(data));
    return dispatch({
      type: "LOGIN",
      payload: data
    });
  };

  const logout = () => {
    sessionStorage.removeItem("auth");
    sessionStorage.removeItem("users");
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
