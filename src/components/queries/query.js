import gql from "graphql-tag";

// Query
export const GET_POSTS = gql`
  query contacts {
    getPosts {
      id
      body
      createdAt
      username
      email
      likes {
        id
        username
      }
      likeCount
      commentCount
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;

// Mutation
export const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      body
      username
      createdAt
      comments {
        id
        username
        body
        createdAt
      }
      likes {
        id
        username
      }
      likeCount
      commentCount
    }
  }
`;
