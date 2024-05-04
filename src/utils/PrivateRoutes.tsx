// import React from "react";

// import { Route, Redirect } from "react-router-dom";
// import { useAuthenticated } from "../store/auth/hooks";

// function PrivateRoute({
//   children,
//   ...rest
// }: {
//   children: JSX.Element | JSX.Element[];
// }) {
//   const isAuthenticated = useAuthenticated();

//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         isAuthenticated ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location, error: "Please sign in first." },
//             }}
//           />
//         )
//       }
//     />
//   );
// }

// export default PrivateRoute;
export{}; //Just to avoid error