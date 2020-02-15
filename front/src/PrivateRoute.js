import React from "react";
import {connect, useSelector} from "react-redux";

import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {

    const auth = useSelector(state => state.user_auth)
  
    return (
        <Route
            {...rest}
            render={props =>
               auth.access_token ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{ pathname: "/sign-in", state: { referer: props.location } }}
                    />
                    )
            }
        />
    );
}

const mapStateToProps = state => {
    return {
        auth: state.user_auth
    }
  };
  
export default connect(mapStateToProps)(PrivateRoute);

