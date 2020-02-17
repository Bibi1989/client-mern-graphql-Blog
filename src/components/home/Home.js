import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Post from "./Post";
import PostBody from "./PostBody";

const Home = () => {
  return <PostBody />;
};

export default Home;
