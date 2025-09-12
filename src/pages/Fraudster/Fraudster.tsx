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
  message,
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
        message.success("✅ Firibgar muvaffaqiyatli saqlandi!");
        form.resetFields();
      },
      onError: (error: any) => {
        // Backend xatolarini ajratib olish
        const err = error?.response?.data;

        if (err?.message && Array.isArray(err.message)) {
          // Har bir xato uchun Form.Item ga error set qilamiz
          form.setFields(
            err.message.map((msg: string) => {
              if (msg.includes("passportCode")) {
                return {
                  name: "passportNumber",
                  errors: [msg],
                };
              }
              if (msg.includes("firstName")) {
                return {
                  name: "firstName",
                  errors: [msg],
                };
              }
              if (msg.includes("lastName")) {
                return {
                  name: "lastName",
                  errors: [msg],
                };
              }
              return {
                name: "_error",
                errors: [msg],
              };
            })
          );
        } else {
          message.error(
            `❌ Xatolik yuz berdi: ${err?.message || "Server xatosi"}`
          );
        }
      },
    });
  };

  return (
    <div style={{ background: "#111827", minHeight: "100vh", padding: "2rem" }}>
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
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ color: "white" }}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="firstName"
                label={<span style={{ color: "white" }}>Ism</span>}
                rules={[{ required: true, message: "Ism kiriting!" }]}
              >
                <Input placeholder="To‘liq ismini kiriting" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="lastName"
                label={<span style={{ color: "white" }}>Familiya</span>}
                rules={[{ required: true, message: "Familiya kiriting!" }]}
              >
                <Input placeholder="Familiyasini kiriting" />
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
                      style={{ width: "30%" }}
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
                    <Input style={{ width: "70%" }} placeholder="2544592" />
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
            <Input placeholder="Manzilni to‘liq kiriting" />
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
                  <Button icon={<UploadOutlined />}>Yuklash</Button>
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
                  rows={5}
                  placeholder="Firibgar haqida tegishli ma'lumotlarni kiriting..."
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
