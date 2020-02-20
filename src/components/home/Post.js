import React, { useContext } from "react";
import styled from "styled-components";
import moment from "moment";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/AuthProvider";
// import { GET_POSTS } from "../queries/query";
import { useHistory } from "react-router-dom";
import { privates } from "../utils/session";

const Post = ({ post }) => {
  const history = useHistory();
  privates(history);

  const { user } = useContext(AuthContext);
  const [likePost] = useMutation(LIKE_POST);
  const [deletePost] = useMutation(DELETE_POST);

  const handleLike = id => {
    likePost({
      variables: { postId: id }
    });
  };
  // useEffect(() => {
  //   if(user && post.username === user.username) {
  //     const likeButton = post.likeCount + 1
  //   }
  // }, []);

  const handleDelete = id => {
    deletePost({
      variables: { postId: id }
    }).then(res => console.log(res));
  };
  const handleComment = () => {};
  return (
    <SubGrid key={post.id}>
      <div className='user'>
        <p className='avatar'>{post.username[0]}</p>
        <div>
          <p>{post.username}</p>
          <p className='date'>
            <span>
              {moment(post.createdAt).fromNow(true)}{" "}
              <i className='fas fa-users'></i>
            </span>
          </p>
        </div>
      </div>
      <div className='body'>
        <p>{post.body}</p>
      </div>
      <div className='comment'>
        <span onClick={() => handleLike(post.id)}>
          <i
            style={post.likeCount > 0 ? { color: "orangered" } : {}}
            className='fas fa-heart'
          ></i>{" "}
          {post.likeCount}
        </span>
        <div>
          {user.username === post.username && (
            <span
              style={{ color: "orangered", paddingRight: "1.3rem" }}
              onClick={() => handleDelete(post.id)}
            >
              <i className='fas fa-trash'></i>
            </span>
          )}
          <span onClick={handleComment}>
            <i className='fas fa-comments'></i> {post.commentCount}
          </span>
        </div>
      </div>
    </SubGrid>
  );
};

const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      username
      createdAt
    }
  }
`;

const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const SubGrid = styled.div`
  padding: 2%;
  border-radius: 5px;
  border: 0.3px solid #999;
  box-shadow: 0 2px 25px #eee;
  margin: 0.5% 0;
  .user {
    display: flex;
    padding-bottom: 1rem;
    .avatar {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      border: 1px solid #999;
      margin-right: 20px;
      font-size: 1.5rem;
    }
    p:first-child {
      color: #4267b2;
    }
    .date {
      font-size: 0.7rem;
    }
  }
  .body {
    padding: 0rem 4rem 1.1rem 3rem;
  }
  .comment {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #999;
    border-bottom: 1px solid #999;
    padding: 5px 0;
    span:first-child {
      /* color: #999; */
    }
    .trash {
      padding-right: 1.3rem;
      color: #ff0000;
    }
  }
`;

export default Post;
