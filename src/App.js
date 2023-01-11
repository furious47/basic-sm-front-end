import { BrowserRouter, Route, Switch } from "react-router-dom";
// import PrivateRoute from "./pages/PrivateRoute";
import { DashBoard, Register, PrivateRoute } from "./pages";

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
      </Switch>
    </BrowserRouter>
  );
};

export default App;
