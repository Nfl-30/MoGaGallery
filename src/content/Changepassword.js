import React from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { useHistory } from "react-router"
import { Form, Button, Input, message } from "antd"
import LayOutWeb from "../layout/layout"


const Change = () => {
    let history = useHistory()

    const onFinish = (event) => {
        console.log(event.email)
        
        axios.post("https://backendexample.sanbersy.com/api/change-password", {
            current_password: event.current_password,
            new_password: event.new_password,
            new_confirm_password: event.new_confirm_password
            },
            {
                headers: {"Authorization" : "Bearer " + Cookies.get('token')}
            }).then((e) => 
            {
                message.success('Password Berhasil Diubah');
                // alert("Password Berhasil Berubah")
                // console.log(e.data)
                history.push('/')

            }
            ).catch((err) => {
                message.error('Password Gagal Diubah, Cek Kembali Password Anda');
                // alert(err)
            })
    }
        
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <div className="form-center">
            <Form
                name="basic"
                labelCol={{
                    span: 9,
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
                className="form-center"
            >
            <Form.Item
                label="Current Password"
                name="current_password"
                rules={[
                {
                    required: true,
                    message: 'Please input Current Password!',
                },
                ]}
            >
            <Input.Password />
            </Form.Item>
            <Form.Item
                label="New Password"
                name="new_password"
                rules={[
                {
                    required: true,
                    message: 'Please input your New Password!',
                },
                ]}
            >
            <Input.Password />
            </Form.Item>

            <Form.Item
                label="New Confirm Password"
                name="new_confirm_password"
                rules={[
                {
                    required: true,
                    message: 'Please input your New Confirm Password!',
                },
                ]}
            >
            <Input.Password />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                offset: 9,
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



const ChangePassword = () => <LayOutWeb content={<Change/>}/>

export {Change}
export default ChangePassword