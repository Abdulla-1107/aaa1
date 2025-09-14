import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Popconfirm,
  notification,
  Tag,
  Tooltip,
  Input,
} from "antd";
import { GetFraudster } from "../api/service/getFraudster";
import { useDeleteFraudster } from "../api/service/deleteFraudster";

const { Search } = Input;

const FraudstersTable = () => {
  const { getFraudsters } = GetFraudster();
  const { data, isLoading, isError } = getFraudsters();

  const { mutate: deleteFraudster } = useDeleteFraudster();

  const [api, contextHolder] = notification.useNotification();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // 🔍 qidiruv state-lar
  const [searchName, setSearchName] = useState("");
  const [searchPassport, setSearchPassport] = useState("");

  const fraudsters = data?.data || [];

  // 🔍 filter qilingan data
  const filteredFraudsters = fraudsters.filter((f: any) => {
    const byName = f.name
      ?.toLowerCase()
      .includes(searchName.toLowerCase());
    const byPassport = f.passportCode
      ?.toLowerCase()
      .includes(searchPassport.toLowerCase());

    return byName && byPassport;
  });

  const handleEdit = (record: any) => {
    api.info({
      message: "Edit bosildi",
      description: `✏️ ${record.name} ${record.surname}`,
      placement: "topRight",
      style: {
        background: "#1f2937",
        color: "#fff",
        borderRadius: "8px",
        fontWeight: "bold",
      },
    });
  };

  const handleDelete = (record: any) => {
    setDeletingId(record.id);
    deleteFraudster(record.id, {
      onSuccess: () => {
        api.success({
          message: "Muvaffaqiyatli!",
          description: `✅ ${record.name} ${record.surname} o‘chirildi`,
          placement: "topRight",
          style: {
            background: "#1f2937",
            color: "#fff",
            borderRadius: "8px",
            fontWeight: "bold",
          },
        });
        setDeletingId(null);
      },
      onError: (error: any) => {
        const err = error?.response?.data;
        api.error({
          message: "Xatolik!",
          description:
            err?.message === "Siz o'zingiz qo'shgan firibgarni o'chira olasiz"
              ? "❌ Siz faqat o‘zingiz qo‘shgan firibgarni o‘chira olasiz"
              : `❌ ${err?.message || "Server xatosi yuz berdi!"}`,
          placement: "topRight",
          style: {
            background: "#1f2937",
            color: "#fff",
            borderRadius: "8px",
            fontWeight: "bold",
          },
        });
        setDeletingId(null);
      },
    });
  };

  const columns = [
    {
      title: "Ism",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <span className="font-semibold text-white">{text}</span>
      ),
    },
    { title: "Familiya", dataIndex: "surname", key: "surname" },
    { title: "Pasport Code", dataIndex: "passportCode", key: "passportCode" },
    {
      title: "Joylashuv",
      dataIndex: "location",
      key: "location",
      render: (text: string) => (
        <Tooltip title={text}>
          <Tag
            color="geekblue"
            className="rounded-lg px-3 py-1 text-sm font-medium"
          >
            {text?.length > 15 ? text.slice(0, 15) + "..." : text}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Amallar",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="primary"
            className="bg-blue-600"
            size="small"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="O‘chirishni tasdiqlaysizmi?"
            onConfirm={() => handleDelete(record)}
            okText="Ha"
            cancelText="Yo‘q"
          >
            <Button
              danger
              size="small"
              loading={deletingId === record.id}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (isLoading)
    return <p className="text-white text-center mt-10">Yuklanmoqda...</p>;
  if (isError)
    return <p className="text-red-500 text-center mt-10">Xatolik yuz berdi</p>;

  return (
    <div className="p-6 bg-gray-900 rounded-xl shadow-lg">
      {contextHolder}

      {/* 🔍 Search inputs */}
      <div className="mb-4 flex gap-4">
        <Search
          placeholder="Ism bo‘yicha qidirish..."
          allowClear
          onSearch={(value) => setSearchName(value)}
          onChange={(e) => setSearchName(e.target.value)}
          style={{ width: 250 }}
        />
        <Search
          placeholder="Passport Code bo‘yicha qidirish..."
          allowClear
          onSearch={(value) => setSearchPassport(value)}
          onChange={(e) => setSearchPassport(e.target.value)}
          style={{ width: 250 }}
        />
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredFraudsters}
        pagination={{ pageSize: 7, showSizeChanger: false }}
        bordered={false}
        tableLayout="fixed"
        scroll={{ y: 400 }}
        className="!bg-gray-900 !text-white rounded-lg overflow-hidden"
        components={{
          header: {
            wrapper: (props) => (
              <thead
                {...props}
                className="bg-gray-800 text-gray-200 uppercase text-xs"
              />
            ),
          },
          body: {
            row: (props) => (
              <tr
                {...props}
                className="hover:bg-gray-800 transition-colors duration-200"
              />
            ),
            cell: (props) => (
              <td
                {...props}
                className="bg-gray-900 text-white px-4 py-2 border-b border-gray-700"
              />
            ),
          },
        }}
      />
    </div>
  );
};

export default React.memo(FraudstersTable);
