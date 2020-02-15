import React, { Component } from "react";
import { connect } from "react-redux";
import { loan } from "../../services/Loan";
import { dateas } from "../../services/Dateas";


import { Form, Select, Input, Button,InputNumber } from 'antd';
const { Option } = Select;
const { Search } = Input;



class LoanApplicationForm extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields( (err, values) => {
            if (!err) {
                this.props.addLoanRequest(values)
            }
        });
    };

    state={
      name:null,
      enable_form:true
    }

    onSearchDocument = async (value) =>{
    
      let name = await dateas.validateDocument(value);

      if(name){
        this.props.form.setFieldsValue({
          full_name: name,
        }) 
  
        this.setState({enable_form:false});

      }
     


    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {enable_form} = this.state;
        return (
          <Form labelCol={{ span: 10 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
            <Form.Item label="Documento">
              {getFieldDecorator('document_number', {
                rules: [{ required: true, message: 'Por favor ingrese su documento' }],
              })(
              <Search placeholder="Documento" onSearch={this.onSearchDocument} enterButton />
              )} <p style={{fontSize:11,marginBottom:-30}}>Por favor valide su documento para continuar</p>
            </Form.Item>
            <Form.Item label="Nombre Completo">
              {getFieldDecorator('full_name', {
                rules: [{ required: true, message: 'Por favor ingrese su nombre completo' }],
              })(<Input placeholder="Nombre Completo" disabled={enable_form} />)}
            </Form.Item>
            <Form.Item label="Sexo">
              {getFieldDecorator('gender', {
                rules: [{ required: true, message: 'Por favor seleccione su genero' }],
              })(
                <Select
                  placeholder="Seleccione su sexo"
                  onChange={this.handleSelectChange}
                  disabled={enable_form}
                >
                  <Option value="M">Masculino</Option>
                  <Option value="F">Femenino</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="Email">
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Por favor ingrese su email' }],
              })(<Input placeholder="Email" disabled={enable_form} />)}
            </Form.Item>
            <Form.Item label="Monto">
              {getFieldDecorator('amount', {
                rules: [{ required: true, message: 'Por favor ingrese un numero' }],
              })(<InputNumber placeholder="Monto" min={0} max={999999} disabled={enable_form} />)}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
              <Button type="primary" htmlType="submit">
                Enviar
              </Button>
            </Form.Item>
          </Form>
        );
      }
    }


const LoanApplication = Form.create({ name: 'normal_login' })(LoanApplicationForm);

const mapStateToProps = state => {
    return {
        auth: state.user_auth,
        loan: state.loan,
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        addLoanRequest: params => {
        dispatch(loan.addLoanRequest(params));
      },
    };
  };
  
export default connect(mapStateToProps,mapDispatchToProps)(LoanApplication);