import { BrowserRouter, Route, Switch } from "react-router-dom";
// import PrivateRoute from "./pages/PrivateRoute";
import { DashBoard, Register, PrivateRoute, Edit, Error } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Register />
        </Route>
        <PrivateRoute path="/dashboard" exact>
          <DashBoard />
        </PrivateRoute>
        <Route path="/edit/:id">
          <Edit />
        </Route>

        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
