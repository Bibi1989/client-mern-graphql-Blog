import React from "react";
import styled from "styled-components";
import moment from "moment";

const Post = ({ post }) => {
    const handleLike = (id) => {
        console.log(id)
    }
    const handleComment = () => {

    }
  return (
    <SubGrid key={post.id}>
      <div className='user'>
        <p className='avatar'>{post.username[0]}</p>
        <div>
          <p>{post.username}</p>
          <p className='date'>
              <p>{moment(post.createdAt).fromNow(true)} <i className='fas fa-users'></i></p>
          </p>
        </div>
      </div>
      <div className='body'>
        <p>{post.body}</p>
      </div>
      <div className='comment'>
        <span onClick={() => handleLike(post.id)}>
          <i className='fas fa-heart'></i> {post.likeCount}
        </span>
        <span onClick={handleComment}><i className='fas fa-comments'></i> {post.commentCount}</span>
      </div>
    </SubGrid>
  );
};

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
    padding-bottom: 1rem;
  }
  .comment {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #999;
    border-bottom: 1px solid #999;
    padding: 5px 0;
    span:first-child {
      color: #999;
    }
  }
`;

export default Post;
