import { BrowserRouter, Route, Switch } from "react-router-dom";
// import PrivateRoute from "./pages/PrivateRoute";
import { DashBoard, Register, PrivateRoute, Edit } from "./pages";

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
      </Switch>
    </BrowserRouter>
  );
};

export default App;
