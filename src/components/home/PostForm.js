import React from "react";
import styled from "styled-components";

const PostForm = () => {
  return (
    <Form>
      <form>
        <div className='input-group'>
          <i className='fas fa-blog icon'></i>
          <input type='text' placeholder='What is on your mind!!!' />
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
