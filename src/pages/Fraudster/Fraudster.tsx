import React from "react";
import {
  Form,
  Input,
  Select,
  Upload,
  Button,
  Card,
  Row,
  Col,
  notification,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { usePassport } from "../../api/service/usePassport";
import { CreateFraudster } from "../../api/service/createFraudster";

const { TextArea } = Input;

const Fraudster: React.FC = () => {
  const { getPassports } = usePassport();
  const { data: passports, isLoading } = getPassports();
  const { createFraudster } = CreateFraudster();

  const [form] = Form.useForm();

  // 🔔 notification hook
  const [api, contextHolder] = notification.useNotification();

  const handleSubmit = (values: any) => {
    const payload = {
      name: values.firstName,
      surname: values.lastName,
      image: values.photo?.[0]?.thumbUrl || "https://via.placeholder.com/150",
      passportId: values.passportId,
      passportCode: values.passportNumber,
      location: values.address,
      description: values.description,
    };

    createFraudster.mutate(payload, {
      onSuccess: () => {
        api.success({
          message: "Muvaffaqiyatli!",
          description: "✅ Firibgar muvaffaqiyatli saqlandi!",
          placement: "topRight",
          style: {
            background: "#1f2937",
            color: "#fff",
            borderRadius: "8px",
            fontWeight: "bold",
          },
        });
        form.resetFields();
      },
      onError: (error: any) => {
        const err = error?.response?.data;
        if (err?.message && Array.isArray(err.message)) {
          form.setFields(
            err.message.map((msg: string) => {
              if (msg.includes("passportCode")) {
                return { name: "passportNumber", errors: [msg] };
              }
              if (msg.includes("firstName")) {
                return { name: "firstName", errors: [msg] };
              }
              if (msg.includes("lastName")) {
                return { name: "lastName", errors: [msg] };
              }
              return { name: "_error", errors: [msg] };
            })
          );
        } else {
          api.error({
            message: "Xatolik!",
            description: `❌ ${err?.message || "Server xatosi yuz berdi!"}`,
            placement: "topRight",
          });
        }
      },
    });
  };

  return (
    <div style={{ padding: "2rem" }}>
      {contextHolder} {/* 🔔 Toast shu yerda chiqadi */}
      <h1
        style={{
          color: "white",
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "2rem",
        }}
      >
        Firibgar qo'shish
      </h1>
      <Card
        title={<span style={{ color: "white" }}>Firibgar haqida ma'lumot</span>}
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#1f2937",
          borderRadius: "12px",
        }}
        headStyle={{ background: "#1f2937", borderBottom: "1px solid #374151" }}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="firstName"
                label={<span style={{ color: "white" }}>Ism</span>}
                rules={[{ required: true, message: "Ism kiriting!" }]}
              >
                <Input
                  placeholder="To‘liq ismini kiriting"
                  className="custom-input"
                  style={{
                    background: "#111827",
                    border: "1px solid #374151",
                    color: "white",
                    borderRadius: "8px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="lastName"
                label={<span style={{ color: "white" }}>Familiya</span>}
                rules={[{ required: true, message: "Familiya kiriting!" }]}
              >
                <Input
                  placeholder="Familiyasini kiriting"
                  className="custom-input"
                  style={{
                    background: "#111827",
                    border: "1px solid #374151",
                    color: "white",
                    borderRadius: "8px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={
                  <span style={{ color: "white" }}>
                    Passport seriya & raqami
                  </span>
                }
              >
                <Input.Group compact>
                  <Form.Item
                    name="passportId"
                    noStyle
                    rules={[{ required: true, message: "Seriyani tanlang!" }]}
                  >
                    <Select
                      loading={isLoading}
                      placeholder="Seriyani tanlang"
                      style={{
                        width: "30%",
                        background: "#111827",
                        border: "1px solid #374151",
                        borderRadius: "8px 0 0 8px",
                        color: "white",
                      }}
                      dropdownStyle={{ background: "#1f2937", color: "white" }}
                    >
                      {passports?.map((p: any) => (
                        <Select.Option key={p.id} value={p.id}>
                          {p.series}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="passportNumber"
                    noStyle
                    rules={[{ required: true, message: "Raqam kiriting!" }]}
                  >
                    <Input
                      className="custom-input"
                      style={{
                        width: "70%",
                        background: "#111827",
                        border: "1px solid #374151",
                        color: "white",
                        borderRadius: "0 8px 8px 0",
                      }}
                      placeholder="2544592"
                    />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="address"
            label={<span style={{ color: "white" }}>Manzil</span>}
            rules={[{ required: true, message: "Manzil kiriting!" }]}
          >
            <Input
              placeholder="Manzilni to‘liq kiriting"
              className="custom-input"
              style={{
                background: "#111827",
                border: "1px solid #374151",
                color: "white",
                borderRadius: "8px",
              }}
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="photo"
                label={
                  <span style={{ color: "white" }}>
                    Firibgar rasmini yuklash
                  </span>
                }
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              >
                <Upload listType="picture" beforeUpload={() => false}>
                  <Button
                    icon={<UploadOutlined />}
                    style={{
                      background: "#111827",
                      border: "1px dashed #374151",
                      color: "white",
                      borderRadius: "8px",
                    }}
                  >
                    Yuklash
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="description"
                label={
                  <span style={{ color: "white" }}>Tavsif / Eslatmalar</span>
                }
              >
                <TextArea
                  className="custom-input"
                  rows={5}
                  placeholder="Firibgar haqida tegishli ma'lumotlarni kiriting..."
                  style={{
                    background: "#111827",
                    border: "1px solid #374151",
                    color: "white",
                    borderRadius: "8px",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={createFraudster.isPending}
              block
              style={{
                background: "#dc2626",
                borderColor: "#dc2626",
                fontWeight: "bold",
                height: "45px",
                borderRadius: "8px",
              }}
            >
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Fraudster;
