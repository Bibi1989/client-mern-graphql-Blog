// import React from "react";
// import { Redirect, Route } from "react-router-dom";
// import Login from "../users/Login";

// const Auth = () => {
//   let authenticate = false;
//   const token = sessionStorage.getItem("auth");
//   const loginRoute = () => {
//     if (token.username) {
//       return (authenticate = true);
//     }
//   };

//   const logoutRoute = () => {
//     if (token.username) {
//       return (authenticate = false);
//     }
//   };

//   const isLogin = () => {
//     return authenticate;
//   };
// };

// const auth = Auth();

// console.log(auth);

// export const PrivateRoute = ({ component, ...rest }) => {
//   const auth = sessionStorage.getItem("auth");
//   const routeComponent = props =>
//     auth ? (
//       React.createElement(component, props)
//     ) : (
//       <Redirect to='/notfound'>
//         <Login />
//       </Redirect>
//     );
//   return <Route {...rest} render={routeComponent} />;
// };

// export default PrivateRoute;
