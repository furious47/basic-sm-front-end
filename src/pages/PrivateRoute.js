import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useGlobalContext } from "../context/appContext";
// import Loading from "../components/Loading";

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useGlobalContext();

  return (
    <Route
      {...rest}
      render={() => {
        return user ? children : <Redirect to="/"></Redirect>;
      }}
    ></Route>
  );
};
export default PrivateRoute;
