import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import "./Login.scss";
import { useSelector, useDispatch } from "react-redux";
import { makeLogin } from "../../reducers/login-reducer";
import { RootState } from "../../store";

const labelStyle = {
  color: "#363636",
  fontWeight: "bold",
  fontSize: "16px",
} as React.CSSProperties;

export const Login: React.FC<{}> = ({}) => {
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    dispatch(makeLogin(values));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const loginState = useSelector((state: RootState) => state.login);

  return (
    <div className="login-container">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          label={<label style={labelStyle}>Username</label>}
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<label style={labelStyle}>Password</label>}
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox style={labelStyle}>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ fontWeight: "bold" }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
