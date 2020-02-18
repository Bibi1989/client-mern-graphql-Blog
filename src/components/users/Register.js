import React, { useState } from "react";
import styled from 'styled-components'

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleInput = event => {
    const { value } = event.target;
    const { name } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleRegister = event => {
    event.preventDefault();
  };

  return (
    <Form>
      <form onSubmit={handleRegister}>
        <div>
          <i className="fa fa-user"></i>
          <input
            type='text'
            name='username'
            placeholder='Username...'
            value={form.username}
            onChange={handleInput}
          />
        </div>
        <div>
          <input
            type='text'
            name='email'
            placeholder='Email Address...'
            value={form.email}
            onChange={handleInput}
          />
        </div>
        <div>
          <input
            type='text'
            name='password'
            placeholder='Password...'
            value={form.password}
            onChange={handleInput}
          />
        </div>
        <div>
          <input
            type='text'
            name='confirmPassword'
            placeholder='Confirm Password...'
            value={form.confirmPassword}
            onChange={handleInput}
          />
        </div>
        <button type='submit'>Register</button>
      </form>
    </Form>
  );
};





const Form = styled.div`
  padding: 5% 20%;
  form{
    width: 100%;
    display: block;
    div{
      width: 80%;
      margin: auto;
      input{
        width: 100%;
        padding: 15px;
        margin: 15px 0;
        border-radius: 5px;
        outline: none;
        border: 0.4px solid #eee;
        box-shadow: 0 3px 15px #eee;
        input:focus{
          background: #f1f1f1;
        }
      }
    }
  }
`

export default Register;
