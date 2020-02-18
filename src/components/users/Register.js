import React, { useState, useContext } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Register = () => {
  const history = useHistory();
  const { logins } = useContext(AuthContext);
  const [error, setErrors] = useState({});
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

  const [register, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      const { login: data } = result.data;
      logins(data);
      history.push("/");
    },
    onError(err) {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.error);
    },
    variables: form
  });

  const handleRegister = event => {
    event.preventDefault();
    if (loading) return "loading...";
    register();

    setForm({
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
  };

  return (
    <Form error={error}>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div>
          <i className='fa fa-user'></i>
          <input
            style={
              error.username
                ? {
                    border: "0.3px solid #ff00007a",
                    boxShadow: "0 2px 15px #ff00007a"
                  }
                : {}
            }
            type='text'
            name='username'
            placeholder={error.username ? error.username : "Username..."}
            value={form.username}
            onChange={handleInput}
          />
        </div>
        <div>
          <i className='fa fa-envelope'></i>
          <input
            style={
              error.email
                ? {
                    border: "0.3px solid #ff00007a",
                    boxShadow: "0 2px 15px #ff00007a"
                  }
                : {}
            }
            type='text'
            name='email'
            placeholder={error.email ? error.email : "Email Address..."}
            value={form.email}
            onChange={handleInput}
          />
        </div>
        <div>
          <i className='fa fa-unlock'></i>
          <input
            style={
              error.password
                ? {
                    border: "0.3px solid #ff00007a",
                    boxShadow: "0 2px 10px #ff00007a"
                  }
                : {}
            }
            type='text'
            name='password'
            placeholder={error.password ? error.password : "Password..."}
            value={form.password}
            onChange={handleInput}
          />
        </div>
        <div>
          <i className='fa fa-unlock'></i>
          <input
            style={
              error.confirmPassword
                ? {
                    border: "0.3px solid #ff00007a",
                    boxShadow: "0 2px 5px #ff00007a"
                  }
                : {}
            }
            type='text'
            name='confirmPassword'
            placeholder={
              error.confirmPassword
                ? "Password do not match"
                : "Confirm Password..."
            }
            value={form.confirmPassword}
            onChange={handleInput}
          />
        </div>
        <button type='submit'>
          <i className='fa fa-share-square'></i> Register
        </button>
      </form>
    </Form>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      username
      email
      token
    }
  }
`;

const Form = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0% 20%;
  .error {
    color: red;
  }
  h1 {
    font-size: 3rem;
    color: teal;
    text-align: center;
    padding-bottom: 1.5rem;
  }
  form {
    width: 100%;
    display: block;
    div {
      width: 80%;
      margin: auto;
      position: relative;
      top: 0;
      i {
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        color: teal;
      }
      input {
        width: 100%;
        padding: 15px 30px;
        margin: 15px 0;
        border-radius: 5px;
        outline: none;
        border: 0.4px solid #eee;
        box-shadow: 0 3px 15px #eee;

        &input:focus {
          background: #f1f1f1;
        }
      }
    }
    button {
      display: block;
      padding: 10px 25px;
      font-size: 1.1rem;
      border-radius: 5px;
      outline: none;
      border: 0.4px solid #eee;
      box-shadow: 0 3px 15px #eee;
      background: teal;
      color: #eee;
      margin: 1rem auto;
    }
  }
`;

export default Register;
