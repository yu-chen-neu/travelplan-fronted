import React, {Component} from 'react';
import { Form, Input, Icon, Button } from 'antd';
import api from './api/index'
import { Link } from "react-router-dom";
import { API_ROOT } from './utils/constants';


class RegistrationForm extends Component {
    state = {
        confirmDirty: false
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}
                  className="register">
                <Form.Item label="Username">
                    {
                        getFieldDecorator('username', {
                            rules: [
                                { required: true, message: 'Please input your username!' }
                            ]
                        })(<Input />)
                    }
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                    {
                        getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    validator: this.validateToNextPassword,
                                }
                            ]
                        })(<Input.Password />)
                    }
                </Form.Item>
                <Form.Item label="Confirm Password" hasFeedback>
                    {
                        getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                }
                            ]
                        })(<Input.Password onBlur={this.handleConfirmBlur} />)
                    }
                </Form.Item>
                <Form.Item label="firstname">
                    {
                        getFieldDecorator('firstname', {
                            rules: [
                                { required: true, message: 'Please input your firstname!' }
                            ]
                        })(<Input />)
                    }
                </Form.Item>
                <Form.Item label="lastname">
                    {
                        getFieldDecorator('lastname', {
                            rules: [
                                { required: true, message: 'Please input your lastname!' }
                            ]
                        })(<Input />)
                    }
                </Form.Item>
                <Form.Item label="email">
                    {
                        getFieldDecorator('email', {
                            rules: [
                                { required: true, message: 'Please input your email!' }
                            ]
                        })(<Input />)
                    }
                </Form.Item>


                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>

                    <p>I already have an account, go back to <Link to="/login">login</Link></p>
                </Form.Item>
            </Form>
        );
    }

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
           const profile={
               username: values.username,
               password: values.password,
               passwordConfirmation:values.password,
               firstname:values.firstname,
               lastname:values.lastname,
               email:values.email,
               profileUrl:""
           }
           if (!err) {
                console.log('Received values of form: ', values);
                  api.signup(profile)
                      .then(response => {
                        // console.log(response);
                        if(response.ok) {
                            return response.text();
                        }
                    })
                    .then(data => {
                        // console.log(data)
                        this.props.history.push('/login');
                    })
            }
        });
    };
}

const Register = Form.create({ name: 'register' })(RegistrationForm);

export default Register;
