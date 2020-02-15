import React from "react";
import {connect} from "react-redux";

import LoanApplication from "../components/Loan/LoanApplicationForm";

function LoanRequest(){
        return (
            <div>
            <h2>Solicitud de Préstamo</h2>
            <LoanApplication/>
            </div>
        );
}


const mapStateToProps = state => {
    return {
        auth: state.user_auth
    }
  };
  
export default connect(mapStateToProps)(LoanRequest);