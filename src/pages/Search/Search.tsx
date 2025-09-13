import React, { useState } from "react";
import { Input, Select, Row, Col, Card, Button, message } from "antd";
import { usePassport } from "../../api/service/usePassport";

const { Option } = Select;

const Search: React.FC = () => {
  const [passportNumber, setPassportNumber] = useState("");
  const [passportId, setPassportId] = useState<string | undefined>();

  const { getPassports } = usePassport();
  const { data: passports, isLoading } = getPassports();

  const handleSearch = () => {
    if (!passportNumber.trim() || !passportId) {
      message.warning("❗ Iltimos passport seriyasi va raqamini kiriting");
      return;
    }

    console.log("🔍 Qidirilmoqda:", { passportId, passportNumber });
  };

  return (
    <div className="flex justify-center">
      <Card
        style={{
          maxWidth: "600px",
          width: "100%",
          background: "#1f2937",
          borderRadius: "10px",
        }}
        bodyStyle={{ padding: "16px" }}
      >
        <Row gutter={8}>
          <Col span={6}>
            <Select
              loading={isLoading}
              value={passportId}
              onChange={setPassportId}
              placeholder="Seriya"
              style={{
                width: "100%",
                background: "#111827",
                color: "white",
                borderRadius: "8px",
              }}
              dropdownStyle={{ background: "#1f2937", color: "white" }}
            >
              {passports?.map((p: any) => (
                <Option key={p.id} value={p.id}>
                  {p.series}
                </Option>
              ))}
            </Select>
          </Col>

          <Col span={12}>
            <Input
              className="custom-input"
              style={{
                background: "#111827",
                border: "1px solid #374151",
                color: "white",
                borderRadius: "8px",
              }}
              placeholder="1234567"
              value={passportNumber}
              onChange={(e) => setPassportNumber(e.target.value)}
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
