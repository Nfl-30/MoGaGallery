import { Form, Button, Input, message } from "antd"
import axios from "axios"
import Cookies from "js-cookie"
import React from "react"
import LayOutWeb from "../layout/layout"

const Login = () => {

    const onFinish = (event) => {
        console.log(event.email)
        
        axios.post("https://backendexample.sanbersy.com/api/user-login", {
            email: event.email,
            password: event.password
            }).then((e) => 
            {
                // alert("Login Berhasil")
                message.success('Login Berhasil');
                // console.log(e.data)
                let token = e.data.token
                Cookies.set('token', token, {expires: 1})
                window.location=('/')
            }
            ).catch((err) => {
                // alert(err)
                message.error('Login Gagal, Periksa Kembali Email dan Password Anda');
            })
    }
        
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <div>
            <Form
                name="basic"
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="form-center-login-register"
            >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                {
                    required: true,
                    message: 'Please input your email!',
                },
                ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
            >
            <Input.Password />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                offset: 6,
                span: 16,
                }}
            >
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
            </Form.Item>
            </Form>
        </div>
    )
}

const LoginContent = () => <LayOutWeb content={<Login/>}/>

export default Login
export {LoginContent}
