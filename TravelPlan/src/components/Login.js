
import React, {Component} from 'react';

import { Form, Icon, Input, Button, message } from 'antd';

import { Link } from 'react-router-dom';

import { API_ROOT } from './utils/constants';
import api from './api/index'
class NormalLoginForm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {
                        getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please input your username!' }]
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />
                        )
                    }
                </Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <Link to="/register">register now!</Link>
            </Form>
        );
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
           const profile={
               username: values.username,
               password: values.password
           }

            if (!err) {
                console.log('Received values of form: ', values);
                api.signin(profile)
                    .then(response => {
                        console.log(response);
                        if(response.ok){
                            return response.json();
                        }
                        throw new Error(response.stateText)
                    })
                    .then(data => {
                        // console.log(data);
                        this.props.handleLoginSucceed(data.jwttoken)
                        message.success("Login Success")
                    })
                    .catch(err => {
                        console.log(err);
                        message.error("Login Fail")
                    })
            }
        });
    };
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default Login;
