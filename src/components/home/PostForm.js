import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import { GET_POSTS, CREATE_POST } from "../queries/query";

const PostForm = () => {
  const [form, setForm] = useState({
    body: ""
  });
  const [createPost] = useMutation(CREATE_POST, {
    variables: form,
    update(proxy, result) {
      const posts = proxy.readQuery({
        query: GET_POSTS
      });
      console.log(posts);
      console.log("res", result);
      posts.getPosts = [result.data.createPost, ...posts.getPosts];
      proxy.writeQuery({
        query: GET_POSTS,
        posts: {
          getPosts: [result.data.createPost, ...posts.getPosts]
        }
      });
      form.body = "";
    },
    onError(err) {
      console.log(err.message);
    }
  });
  console.log(form);

  const handleInput = e => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handlePosts = e => {
    e.preventDefault();
    createPost();
  };

  return (
    <Form>
      <form onSubmit={handlePosts}>
        <div className='input-group'>
          <i className='fas fa-blog icon'></i>
          <input
            type='text'
            name='body'
            placeholder='What is on your mind!!!'
            onChange={handleInput}
          />
        </div>
      </form>
    </Form>
  );
};

const Form = styled.div`
  padding: 2% 20%;
  form {
    width: 100%;
    .input-group {
      width: 100%;
      display: flex;
      position: relative;
      .icon {
        font-size: 2.5rem;
        position: absolute;
        top: 25%;
        left: 1%;
        color: #4267b2;
      }
      input {
        width: 100%;
        padding: 30px 20px 30px 3.5rem;
        border: 0.3px solid #999;
        border-radius: 5px;
        box-shadow: 0 5px 25px #eee;
        font-size: 1.5rem;
        outline: none;
      }
    }
  }
`;

export default PostForm;
