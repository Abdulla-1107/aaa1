import React, { useState } from "react";
import { Input, Select, Row, Col, Card, Button, message } from "antd";

const { Option } = Select;

const Search: React.FC = () => {
  const [regionCode, setRegionCode] = useState("AD");
  const [passportNumber, setPassportNumber] = useState("");

  const handleSearch = () => {
    if (!passportNumber) {
      message.warning("❗ Iltimos passport raqamini kiriting");
      return;
    }

    // 🔹 Bu joyda API chaqirish mumkin
    console.log("🔍 Qidirilmoqda:", {
      regionCode,
      passportNumber,
    });

    // Masalan:
    // api.get(`/fraudster/search?code=${regionCode}&number=${passportNumber}`)
    //   .then(res => console.log(res.data));
  };

  return (
    <div style={{ background: "#111827", padding: "1rem" }}>
      <Card
        style={{
          maxWidth: "600px",
          background: "#1f2937",
          borderRadius: "10px",
        }}
        bodyStyle={{ padding: "16px" }}
      >
        <Row gutter={8}>
          <Col span={6}>
            <Select
              value={regionCode}
              onChange={setRegionCode}
              style={{ width: "100%" }}
            >
              <Option value="AD">AD</Option>
              <Option value="AB">AB</Option>
              <Option value="AA">AA</Option>
              <Option value="AC">AC</Option>
            </Select>
          </Col>
          <Col span={12}>
            <Input
              placeholder="123456"
              value={passportNumber}
              onChange={(e) => setPassportNumber(e.target.value)}
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={6}>
            <Button type="primary" block onClick={handleSearch}>
              Qidirish
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default React.memo(Search);
