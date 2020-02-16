import React, { Component } from "react";
import { connect } from "react-redux";
import { loan } from "../../services/Loan";
import { dateas } from "../../services/Dateas";


import { Form, Select, Input, Button, InputNumber, notification} from 'antd';
const { Option } = Select;
const { Search } = Input;

const genderSelect = {
	"Masculino": "M",
	"Femenino": "F"
}
const statusSelect = {
	"Aprobado": "approved",
	"Denegado": "denied"
}

const openNotification = placement => {
	notification.error({
		message: `Error!`,
		description:placement,
		placement:'bottomRight',

	});
};

const openNotificationSuccess = placement => {
	notification.success({
		message: `Exito!`,
		description:placement,
		placement:'bottomRight',

	});
};


class LoanApplicationForm extends Component {

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields( async (err, values) => {
			if (!err) {
				const { loanRequest, auth, redirectHome, hideForm } = this.props;
				if (loanRequest) {


					values['id'] = loanRequest.id;
					values['borrower'] = loanRequest.borrower;
					let data = await loan.updateLoanRequest(values, auth.access_token);
					if(data['error']){
						openNotification("Ah ocurrido un error intente mas tarde")
					}else{
						openNotificationSuccess("Solicitud actualizada correctamente")
						redirectHome()
					}
					
					
				} else {
					let data = await loan.addLoanRequest(values);
					if(data['error']){
						openNotification("Ah ocurrido un error intente mas tarde")
					}
					else if(data['status']==="denied"){
						openNotification("La solicitud ah sido rechazada")
					}
					else if(data['status']==="approved"){
						openNotificationSuccess("Solicitud ah sido aprobada")
						hideForm()
					}
					
					
				}
			}
		});
		
	};

	state = {
		name: null,
		enable_form: false
	}

	
	




	onSearchDocument = async (value) => {

		let data = await dateas.validateDocument(value);

		if (!data['error']) {
			this.setState({ enable_form: true, error: false });
			let values = {
				full_name: data['full_name'],
				gender: data['gender'],
				email: data['email'],
			}

			this.props.form.setFieldsValue(values)
		}
		else {
			this.setState(
				{ error: "No se encontraron resultados" }
			);
		}
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { enable_form, error } = this.state;
		const { loanRequest, auth, redirectHome,loan } = this.props;

		return (
			<Form labelCol={{ span: 10 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
				<Form.Item label="Documento">
					{getFieldDecorator('document_number', {
						rules: [{ required: true, message: 'Por favor ingrese su documento' }],
						initialValue: loanRequest ? loanRequest.borrower_data.document_number : null,
					})(
						<Search maxLength={30} placeholder="Documento" onSearch={this.onSearchDocument} enterButton />
					)}
					{error && <p style={{ fontSize: 11, marginBottom: -30, color: "#FF0000" }}>{error}</p>}
					{!enable_form && <p style={{ fontSize: 11, marginBottom: -30 }}>Por favor valide su documento para continuar</p>}
				</Form.Item>
				{(enable_form || loanRequest) && <div> <Form.Item label="Nombre Completo">
					{getFieldDecorator('full_name', {
						rules: [{ required: true, message: 'Por favor ingrese su nombre completo' }],
						initialValue: loanRequest ? loanRequest.borrower_data.full_name : null,

					})(<Input maxLength={61} placeholder="Nombre Completo" />)}
				</Form.Item>
					<Form.Item label="Sexo">
						{getFieldDecorator('gender', {
							rules: [{ required: true, message: 'Por favor seleccione su genero' }],
							initialValue: loanRequest ? genderSelect[loanRequest.borrower_data.gender] : null,
						})(
							<Select
								placeholder="Seleccione su sexo"
								onChange={this.handleSelectChange}
							>
								<Option value="M">Masculino</Option>
								<Option value="F">Femenino</Option>
							</Select>,
						)}
					</Form.Item>
					<Form.Item label="Email">
						{getFieldDecorator('email', {
							rules: [{ required: true, message: 'Por favor ingrese su email' }],
							initialValue: loanRequest ? loanRequest.borrower_data.email : null,
						})(<Input maxLength={50} placeholder="Email" />)}
					</Form.Item>
					<Form.Item label="Monto">
						{getFieldDecorator('amount', {
							rules: [{ required: true, message: 'Por favor ingrese un numero' }],
							initialValue: loanRequest ? loanRequest.amount : null,
						})(<InputNumber placeholder="Monto" min={0} max={999999} />)}
					</Form.Item>
					{auth.access_token ?
						<Form.Item label="Status">
							{getFieldDecorator('status', {
								rules: [{ required: true, message: 'Por favor seleccione su genero' }],
								initialValue: loanRequest ? statusSelect[loanRequest.status] : null,
							})(
								<Select
									placeholder="Seleccione"
								>
									<Option value="approved">Aprobado</Option>
									<Option value="denied">Denegado</Option>
								</Select>,
							)}
						</Form.Item> : null}
					<Form.Item wrapperCol={{ span: 12, offset: 5 }}>
						<Button style={{marginRight:9}}  type="primary" htmlType="submit">
							{auth.access_token ? 'Guardar' : 'Enviar'}
						</Button>
						
						{auth.access_token ?
							<Button onClick={() => redirectHome()} type="primary">
								Atras
              </Button> : null}
					</Form.Item></div>}
					
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




export default connect(mapStateToProps)(LoanApplication);