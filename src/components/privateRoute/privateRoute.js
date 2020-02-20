// import React, { useContext } from "react";
// import { Redirect, Route } from "react-router-dom";

// import { AuthContext } from "../context/AuthProvider";
// // import Login from "../users/Login";

// export const PrivateRoute = ({ component: Component, ...rest }) => {
//   const { user } = useContext(AuthContext);
//   return (
//     <Route
//       {...rest}
//       render={props => (user ? <Redirect to='/' /> : <Component {...props} />)}
//     />
//   );
// };

// export default PrivateRoute;
