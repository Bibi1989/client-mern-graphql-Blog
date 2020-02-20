import React, { useContext } from "react";
import PostBody from "./PostBody";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Login from "../users/Login";
// import { AuthContext } from "../context/AuthProvider";

const Home = () => {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  // const auth = sessionStorage.getItem("auth");
  if (user) {
    return <PostBody />;
  }
};

export default Home;
