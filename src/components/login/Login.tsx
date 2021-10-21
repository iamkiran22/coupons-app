import React from "react";
import { Form, Input, Button, Checkbox, Spin, message } from "antd";
import "./Login.scss";
import { useSelector } from "react-redux";
import { makeLogin } from "../../reducers/login-reducer";
import { RootState, useAppDispatch } from "../../store";

const labelStyle = {
  color: "#363636",
  fontWeight: "bold",
  fontSize: "16px",
} as React.CSSProperties;

export const Login: React.FC<{}> = ({}) => {
  const dispatch = useAppDispatch();

  const onFinish = async (values: any) => {
    try {
      await dispatch(makeLogin(values)).unwrap();
      message.success("You have logged in successfully");
    } catch (e) {
      message.warning("There is an error while processing login request");
    }
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
        style={{ filter: loginState.loading ? "blur(2px)" : "none" }}
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
      {loginState.loading && <Spin />}
    </div>
  );
};
