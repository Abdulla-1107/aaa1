import React from "react";
import { Table } from "antd";
import { GetFraudster } from "../api/service/getFraudster";

const FraudstersTable = () => {
  const { getFraudsters } = GetFraudster();
  const { data, isLoading, isError } = getFraudsters();

  const fraudsters = data?.data || [];

  const columns = [
    { title: "Ism", dataIndex: "name", key: "name" },
    { title: "Familiya", dataIndex: "surname", key: "surname" },
    { title: "Pasport ID", dataIndex: "passportId", key: "passportId" },
    { title: "Pasport Code", dataIndex: "passportCode", key: "passportCode" },
    { title: "Joylashuv", dataIndex: "location", key: "location" },
  ];

  if (isLoading)
    return <p className="text-white text-center mt-10">Yuklanmoqda...</p>;
  if (isError)
    return <p className="text-red-500 text-center mt-10">Xatolik yuz berdi</p>;

  return (
    <div className="p-6 bg-gray-900 rounded-xl">
      <Table
        rowKey="passportId"
        columns={columns}
        dataSource={fraudsters}
        pagination={false}
        bordered={false}
        tableLayout="fixed"
        scroll={{ y: 400 }} // 👈 Pastga scroll qo'shildi (400px balandlikdan keyin)
        className="!bg-gray-900 !text-white"
        components={{
          header: {
            wrapper: (props) => (
              <thead
                {...props}
                className="bg-gray-800 text-white uppercase text-sm"
              />
            ),
          },
          body: {
            row: (props) => (
              <tr {...props} className="bg-gray-900 text-white" />
            ),
            cell: (props) => (
              <td {...props} className="bg-gray-900 text-white px-4 py-2" />
            ),
          },
        }}
      />
    </div>
  );
};

export default React.memo(FraudstersTable);
