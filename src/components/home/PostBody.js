import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Post from "./Post";
import PostForm from "./PostForm";

const PostBody = () => {
  const { loading, data } = useQuery(GET_POSTs);
  console.log(data);
  if (loading) {
    return <p>Loading</p>;
  }
  return (
    <>
    <H1><i className="fa fa-plus"></i> Create Post</H1>
    <PostForm />
      <Grid>
        {data.getPosts.map(post => {
          return <Post key={post.id} post={post} />;
        })}
      </Grid>
    </>
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

const H1 = styled.h1`
    padding: 0.5rem 20% 0 20%;
    font-size: 1.5rem;
    color: #777;
    i{
        color: teal;
    }
`

export default PostBody;
