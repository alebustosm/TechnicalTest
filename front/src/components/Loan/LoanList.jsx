import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loan } from "../../services/Loan";
import { Table, Divider ,Modal} from 'antd';

const confirm = Modal.confirm;



function LoanList() {
    
    const [data] = useState([]);
    const auth = useSelector(state => state.user_auth)
    const loanList = useSelector(state => state.loanList)

    const dispatch = useDispatch()
    let history = useHistory();

    useEffect(() => {
        dispatch(loan.fetchLoanRequest(auth.access_token));
    }, [data]);

    const deleteLoanRequest =  (record) =>{
      
      

      confirm({
        title: "Eliminar",
        content:"¿Estás seguro que deseas eliminar la solicitud de prestamo?",
        onOk() {
          dispatch(loan.deleteLoanRequest(record,auth.access_token));
        },
        cancelText: "Cancelar",
        onCancel() {},
      });


    }

    const columns = [
        {
          title: 'Nombre Completo',
          dataIndex: 'borrower_data',
          key: 'full_name',
          width:'150px',
          render: text =>{
               return<a>{text.full_name}</a>
              },
        },
         {
          title: 'Documento',
          dataIndex: 'borrower_data',
          key: 'document_number',
          render: text =>{
               return<a>{text.document_number}</a>
              },
         },
         {
          title: 'Email',
          dataIndex: 'borrower_data',
          key: 'email',
          width:'200px',
          render: text =>{
               return<a>{text.email}</a>
              },
         },
         {
          title: 'Sexo',
          dataIndex: 'borrower_data',
          key: 'gender',
          render: text =>{
               return<a>{text.gender}</a>
              },
         },
         {
          title: 'Monto',
          dataIndex: 'amount',
          key: 'amount',
          render: text =>{
               return<a>{text}</a>
              },
         },
         {
          title: 'Estado',
          dataIndex: 'status',
          key: 'status',
          render: text =>{
               return<a>{text}</a>
              },
         },
        {
          title: '',
          key: 'action',
          render: (text, record) => (
            <span>
              <a onClick={() =>deleteLoanRequest(record) }>Eliminar</a>
              <Divider type="vertical" />
              <a onClick={() => history.push("/loan",{ loanRequest: record })}>Editar</a>
            </span>
          ),
        },
      ];

    return (
        <Table 
            columns={columns} 
            dataSource={loanList.results}
            pagination={{
                // onChange: (page) => {this.onChangePage(page)},
                pageSize: 5,
                // current:this.props.page ? parseInt(this.props.page,10) : 1,
                total: loanList.count ? loanList.count : 0,
                size:'medium'
                }}
            />);
}


const mapStateToProps = state => {
    return {
        auth: state.user_auth,
        loanList: state.loanList,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchLoanRequest: params => {
            dispatch(loan.fetchLoanRequest(params));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoanList);