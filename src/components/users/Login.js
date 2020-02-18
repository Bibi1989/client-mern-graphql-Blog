import React, { useState, useContext } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import logo from "../../logo.svg";
import { AuthContext } from "../context/AuthProvider";

const Login = () => {
  const history = useHistory();
  const { logins } = useContext(AuthContext);
  const [error, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleInput = event => {
    const { value } = event.target;
    const { name } = event.target;
    setForm({ ...form, [name]: value });
  };

  const [login, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      const { login: data } = result.data;
      logins(data);
      sessionStorage.setItem("auth", JSON.stringify(data));
      history.push("/");
    },
    onError(err) {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.error);
    },
    variables: form
  });

  const handleLogin = event => {
    event.preventDefault();
    login();
    if (loading) return "loading...";
    setForm({
      email: "",
      password: ""
    });
  };

  return (
    <Form error={error}>
      <h1>Login</h1>
      {loading ? (
        <img src={logo} alt='logo' />
      ) : (
        <form onSubmit={handleLogin}>
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
          <button type='submit'>
            <i className='fa fa-share-square'></i> Login
          </button>
        </form>
      )}
    </Form>
  );
};

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
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

export default Login;
