import React from "react"
import axios from "axios"
import { useHistory } from "react-router"
import LayOutWeb from "../layout/layout"
import { Form, Button, Input, message } from "antd"


const Register = () => {
    let history = useHistory()

    const onFinish = (event) => {
        console.log(event.email)
        
        axios.post("https://backendexample.sanbersy.com/api/register", {
            name: event.name,
            email: event.email,
            password: event.password
            }).then((e) => 
            {
                // alert("Register Berhasil")
                message.success('Register Berhasil');

                // console.log(e.data)
                history.push('/login')

            }
            ).catch((err) => {
                message.error('Register Gagal Silahkan Cek Kembali Email dan Password Anda');
                // alert(err)
            })
    }
        
    const onFinishFailed = (errorInfo) => {
        message.error('Register Gagal', errorInfo);
        // console.log('Failed:', errorInfo)
    }

    return (
        <>
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
                label="Nama"
                name="name"
                rules={[
                {
                    required: true,
                    message: 'Please input your name!',
                },
                ]}
            >
            <Input />
            </Form.Item>
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
        </>
    )
}



const RegisterContent = () => <LayOutWeb content={<Register/>}/>

export default Register
export {RegisterContent}