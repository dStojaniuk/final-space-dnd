import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../../pages/Home/Home";
import List from "../../pages/List/List";
import Navbar from "../Navbar/Navbar";
import "./AppRoutes.css";

export default function AppRoutes() {
  return (
    <div className="router">
      <Router>
        <Navbar />
        <div className="routes">
          <Switch>
            <Route path="/list">
              <List />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
