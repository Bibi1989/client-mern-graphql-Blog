import React from "react";
import PostBody from "./PostBody";
import { useHistory } from "react-router-dom";
// import { AuthContext } from "../context/AuthProvider";

const Home = () => {
  const history = useHistory();
  const auth = sessionStorage.getItem("auth");
  if (auth === null) {
    history.push("/login");
    return;
  }

  return (
    <>
      <PostBody />
    </>
  );
};

export default Home;
