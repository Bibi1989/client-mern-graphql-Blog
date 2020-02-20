import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import NotFound from "./components/users/NotFound";
import NavBar from "./components/NavBar";
import PostBody from "./components/home/PostBody";
// import PrivateRoute from "./components/privateRoute/privateRoute";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path='/'>
          <PostBody />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/register'>
          <Register />
        </Route>
        <Route to='/abc'>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
