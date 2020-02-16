import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { connect, useSelector, useDispatch} from "react-redux";


import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PrivateRoute from './PrivateRoute';


import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import LoanRequest from "./pages/LoanRequest";
import { auth as user } from "./services/Auth";
 


function App() {
	const auth = useSelector(state => state.user_auth)
	const dispatch = useDispatch()

	return (<Router>
		<div className="App">
			<nav className="navbar navbar-expand-lg navbar-light fixed-top">
				<div className="container">
					<Link className="navbar-brand" to={""}>Moni</Link>
					<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
						{!auth.access_token ? <Link to={"/loan"}>Solicitud de Prestamos</Link> : <Link to={"/loan-list"}>Listado Solicitudes de Prestamos</Link>}
						<ul className="navbar-nav ml-auto">
							{!auth.access_token ? <li className="nav-item">
								<Link className="nav-link" to={"/sign-in"}>Login</Link>
							</li> : <Link className="nav-link" onClick={()=> dispatch(user.logout(auth.access_token))}>Logout</Link>}

						</ul>
					</div>
				</div>
			</nav>

			<div className="auth-wrapper">
				<div className="auth-inner">
					<Switch>
						<Route exact path="/sign-in" component={Login} />
						<PrivateRoute exact path='/loan-list' component={Home} />
						<Route exact path="/loan" component={LoanRequest} />
						<Route exact path="/" component={LoanRequest} />
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