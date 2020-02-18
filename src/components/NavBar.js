import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "./context/AuthProvider";

const activeBorder = {
  color: "teal",
  borderBottom: "5px solid teal"
};

const NavBar = () => {
  const token = sessionStorage.getItem("auth");
  const { logout, user } = useContext(AuthContext);
  const path = useLocation();
  const [active, setActive] = useState({
    home: true,
    login: false,
    register: false,
    logouts: false
  });
  const handleClick = link => {
    if (link === "home") {
      setActive({
        home: true,
        login: false,
        register: false,
        logouts: false
      });
    } else if (link === "login") {
      setActive({
        home: false,
        login: true,
        register: false,
        logouts: false
      });
    } else if (link === "register") {
      setActive({
        home: false,
        login: false,
        register: true,
        logouts: false
      });
    }
  };

  const urlCheck = () => {
    if (path.pathname === "/" || path.pathname === "") {
      setActive({
        home: true,
        login: false,
        register: false,
        logouts: false
      });
    } else if (path.pathname === "/login") {
      setActive({
        home: false,
        login: true,
        register: false,
        logouts: false
      });
    } else if (path.pathname === "/register") {
      setActive({
        home: false,
        login: false,
        register: true,
        logouts: false
      });
    }
  };
  useEffect(() => {
    urlCheck();
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    logout();
    sessionStorage.removeItem("auth");
    setActive({
      home: false,
      login: false,
      register: false,
      logouts: true
    });
  };

  //   const getToken = sessionStorage.getItem("auth")
  const getToken = JSON.parse(token);

  return (
    <div>
      <Nav>
        <ul>
          <li onClick={() => handleClick("home")}>
            <Link
              to='/'
              className='links'
              style={active.home ? activeBorder : {}}
            >
              {token
                ? getToken.username === undefined ||
                  `${getToken.username[0].toUpperCase()}${getToken.username.slice(
                    1
                  )}`
                : "Home"}
            </Link>
          </li>
          <div>
            {!getToken && (
              <>
                <li onClick={() => handleClick("login")}>
                  <Link
                    to='/login'
                    className='links'
                    style={active.login ? activeBorder : {}}
                  >
                    Login
                  </Link>
                </li>
                <li onClick={() => handleClick("register")}>
                  <Link
                    to='/register'
                    className='links'
                    style={active.register ? activeBorder : {}}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
            {getToken && (
              <li onClick={() => handleLogout()}>
                <Link
                  to='/login'
                  className='links'
                  style={active.logouts ? activeBorder : {}}
                >
                  Logout
                </Link>
              </li>
            )}
          </div>
        </ul>
      </Nav>
    </div>
  );
};

export default NavBar;

const Nav = styled.div`
  padding: 1rem 10%;
  background: #f1f1f1;
  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    div {
      display: flex;
      li {
        padding: 0 1rem;
        .links {
          text-decoration: none;
          color: #555;
          font-size: 1.3rem;
          padding: 0.7rem 10px;
          transition: all 0.5s ease;
        }
      }
    }
    li:first-child {
      .links {
        text-decoration: none;
        color: #555;
        font-size: 1.3rem;
        padding: 0.7rem 10px;
        transition: all 0.5s ease;
      }
    }
  }
`;
