import React from "react";
import {connect} from "react-redux";

import LoanList from "../components/Loan/LoanList";



function Home(){
        return (
         <LoanList/>   
        );
}


const mapStateToProps = state => {
    return {
        auth: state.user_auth
    }
  };
  
export default connect(mapStateToProps)(Home);