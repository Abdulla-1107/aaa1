import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login, LoginData, LoginResponse } from "../api/api";
import { Form, Input, Button, Typography, Alert, Card } from "antd";

const { Title } = Typography;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = React.useState("");

  const mutation = useMutation<LoginResponse, any, LoginData>({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      navigate("/"); // Home ga yo‘naltirish
    },
    onError: (error: any) => {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Login xato bo‘ldi");
      }
    },
  });

  const handleSubmit = (values: LoginData) => {
    setErrorMessage("");
    mutation.mutate(values);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-950">
      <Card
        style={{ backgroundColor: "#111827", borderColor: "#1f2937" }} // bg-gray-900, border-gray-800
        className="w-96 shadow-lg"
      >
        <Title level={3} className="text-center text-white">
          Login
        </Title>

        {errorMessage && (
          <Alert
            message={errorMessage}
            type="error"
            showIcon
            className="mb-4"
          />
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="text-white"
        >
          <Form.Item
            label={<span className="text-gray-300">Username</span>}
            name="username"
            rules={[{ required: true, message: "Iltimos, username kiriting" }]}
          >
            <Input
              placeholder="Username"
              className="bg-gray-800 text-white placeholder-black border-gray-700"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-gray-300">Password</span>}
            name="password"
            rules={[{ required: true, message: "Iltimos, parol kiriting" }]}
          >
            <Input.Password
              placeholder="Password"
              className="bg-gray-800 text-white placeholder-white border-gray-700"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={mutation.isPending}
              block
              className="bg-blue-600"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
