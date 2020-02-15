import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../services/Auth";

import { Form, Icon, Input, Button } from 'antd';



class LoginForm extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields( (err, values) => {
            if (!err) {
                this.props.login(values);
            }
        });
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        const {auth} = this.props
        auth.access_token &&
                this.props.history.push("/");



        return (
            <Form onSubmit={this.handleSubmit} >
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <p>{auth.error_description && auth.error_description}</p>
                <Form.Item>

                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
          </Button>
                </Form.Item>
            </Form>
        );
    }
}


const Login = Form.create({ name: 'normal_login' })(LoginForm);

const mapStateToProps = state => {
    return {
        auth: state.user_auth,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      login: params => {
        dispatch(auth.login(params));
      },
    };
  };

export default connect(mapStateToProps,mapDispatchToProps)(Login);