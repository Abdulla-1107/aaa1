// src/pages/User/User.tsx
import React, { useMemo } from "react";
import { useUsers } from "../../api/service/useUser";
import { Table } from "antd";

const User = () => {
  const { getUsers } = useUsers();

  const params = useMemo(() => ({ page: "1", limit: "10" }), []);
  const { data, isLoading, error } = getUsers(params);

  const columns = [
    {
      title: "Ism",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Rol",
      dataIndex: "role",
      key: "role",
    },
  ];

  if (isLoading) return <div className="text-white">⏳ Yuklanmoqda...</div>;
  if (error) return <div className="text-red-500">❌ Xato yuz berdi</div>;

  return (
    <div className="p-6 bg-gray-900 h-full">
      <h2 className="text-2xl font-bold text-white mb-4">👤 Foydalanuvchilar</h2>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data || []}
        pagination={false}
        bordered
        className="dark-table"
      />
    </div>
  );
};

export default React.memo(User);
