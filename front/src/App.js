import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import {connect, useSelector} from "react-redux";


import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PrivateRoute from './PrivateRoute';


import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";



function App() {
  const auth = useSelector(state => state.user_auth)

  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>Moni</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
             {!auth.access_token && <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>}
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}



const mapStateToProps = state => {
  return {
      auth: state.user_auth
  }
};

export default connect(mapStateToProps)(App);