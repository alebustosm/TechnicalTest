import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Typography, Button } from 'antd';


import LoanApplication from "../components/Loan/LoanApplicationForm";
const { Title } = Typography;

function LoanRequest() {
    const [showLoanForm, setShowLoanForm] = useState(true);
    const [showMessage, setshowMessage] = useState('');
    const auth = useSelector(state => state.user_auth)


    let history = useHistory();

    const redirectHome = () => {

        history.push("/loan-list")


    }

    const { state } = history.location;

    const { loanRequest } = state ? state : {};


    return (
        showLoanForm ? <div>
            <h2 style={{ textAlign: "center" }}>{auth.access_token ? 'Editar Solicitud de Prestamos' : 'Solicitud de Préstamo'}</h2>
            <LoanApplication setshowMessage={setshowMessage} loanRequest={loanRequest} redirectHome={redirectHome} hideForm={setShowLoanForm} />
        </div> : <div><Title level={2}>{showMessage}</Title><Button onClick={() => setShowLoanForm(true)}>Atras</Button></div>

    );
}


const mapStateToProps = state => {
    return {
        auth: state.user_auth,
    }
};

export default connect(mapStateToProps)(LoanRequest);