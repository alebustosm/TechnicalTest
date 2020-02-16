import React, { useState } from "react";
import {connect, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";


import LoanApplication from "../components/Loan/LoanApplicationForm";

function LoanRequest(){
    const [showLoanForm, setShowLoanForm] = useState(true);
    const auth = useSelector(state => state.user_auth)
    const loan = useSelector(state => state.loan)


    let history = useHistory();
    
    const redirectHome = () =>{
      
        history.push("/loan-list")
        
        
    }  
    
    const {state} = history.location;
    
    const {loanRequest} = state ? state : {} ;


        return (
           showLoanForm ? <div>
            <h2 style={{textAlign:"center"}}>{auth.access_token ? 'Editar Solicitud de Prestamos':'Solicitud de Préstamo'}</h2>
            <LoanApplication loanRequest={loanRequest} redirectHome={redirectHome} hideForm={setShowLoanForm}/>
            </div> : "Solicitud Enviada"
        );
}


const mapStateToProps = state => {
    return {
        auth: state.user_auth,
        loan: state.loan
    }
  };
  
export default connect(mapStateToProps)(LoanRequest);