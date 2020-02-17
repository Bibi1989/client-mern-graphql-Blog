import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Post from "./Post";

const PostBody = () => {
  const { loading, data } = useQuery(GET_POSTs);
  console.log(data);
  if (loading) {
    return <p>Loading</p>;
  }
  return (
    <Grid>
      {data.getPosts.map(post => {
        return <Post key={post.id} post={post} />;
      })}
    </Grid>
  );
};

const GET_POSTs = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      email
      likeCount
      commentCount
      likes {
        id
        username
      }
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;

const Grid = styled.div`
  display: grid;
  padding: 2% 20%;
`;

export default PostBody;
