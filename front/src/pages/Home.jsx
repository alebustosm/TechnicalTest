import React from "react";
import {connect} from "react-redux";

import { Card } from 'antd';
import LoanList from "../components/Loan/LoanList";

const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };

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