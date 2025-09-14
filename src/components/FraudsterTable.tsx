import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  Button,
  Space,
  Popconfirm,
  notification,
  Tag,
  Tooltip,
  Input,
  Empty,
  Spin,
} from "antd";
import { GetFraudster } from "../api/service/getFraudster";
import { useDeleteFraudster } from "../api/service/deleteFraudster";

const { Search } = Input;

function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

const FraudstersTable = () => {
  const { getFraudsters } = GetFraudster();
  // agar backend so'rovlar bilan ishlansa, getFraudsters() ni queryFn bilan parametrga moslashtirish kerak bo'ladi
  const { data, isLoading, isError, refetch } = getFraudsters();

  const { mutate: deleteFraudster } = useDeleteFraudster();

  const [api, contextHolder] = notification.useNotification();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // search state
  const [searchName, setSearchName] = useState("");
  const [searchPassport, setSearchPassport] = useState("");

  // debounce qilingan qiymatlar — bu bilan backendga/filtrga kamroq so'rov yuboramiz
  const debouncedName = useDebounce(searchName, 350);
  const debouncedPassport = useDebounce(searchPassport, 350);

  // Agar backendga yubormoqchi bo'lsang: refetch({ queryKey: ['fraudsters', debouncedName, debouncedPassport] })
  // Hozir frontend filter: (agar dataset katta bo'lsa, backend search qilishni tavsiya qilaman)
  const fraudsters = data?.data || [];

  const filteredFraudsters = useMemo(() => {
    const name = (debouncedName || "").toLowerCase().trim();
    const passport = (debouncedPassport || "").toLowerCase().trim();

    // agar ikkala input ham bo'sh bo'lsa hamma yozuv qaytadi
    if (!name && !passport) return fraudsters;

    return fraudsters.filter((f: any) => {
      const byName = name ? (f.name || "").toLowerCase().includes(name) : true;
      const byPassport = passport
        ? (f.passportCode || "").toLowerCase().includes(passport)
        : true;
      return byName && byPassport;
    });
  }, [fraudsters, debouncedName, debouncedPassport]);

  // agar backend search kerak bo'lsa: useEffect(() => refetch(), [debouncedName, debouncedPassport])
  useEffect(() => {
    // Agar backend qidiruvni qo'llashni xohlasang, shu yerda refetch chaqir
    // refetch(); // + sozlashlarni qilish kerak (query params)
  }, [debouncedName, debouncedPassport, refetch]);

  const handleEdit = (record: any) => {
    api.info({
      message: "Edit bosildi",
      description: `✏️ ${record.name} ${record.surname}`,
      placement: "topRight",
      style: { background: "#1f2937", color: "#fff", borderRadius: 8 },
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
          style: { background: "#1f2937", color: "#fff", borderRadius: 8 },
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
          style: { background: "#1f2937", color: "#fff", borderRadius: 8 },
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
      ellipsis: { showTitle: false },
      render: (text: string) => (
        <Tooltip title={text}>
          <span className="font-semibold text-white">{text}</span>
        </Tooltip>
      ),
    },
    { title: "Familiya", dataIndex: "surname", key: "surname", ellipsis: true },
    { title: "Pasport Code", dataIndex: "passportCode", key: "passportCode" },
    {
      title: "Joylashuv",
      dataIndex: "location",
      key: "location",
      render: (text: string) => (
        <Tooltip title={text}>
          <Tag className="rounded-lg px-3 py-1 text-sm font-medium">
            {text?.length > 20 ? text.slice(0, 20) + "..." : text}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Amallar",
      key: "actions",
      width: 160,
      render: (_: any, record: any) => (
        <Space>
          <Button size="small" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="O‘chirishni tasdiqlaysizmi?"
            onConfirm={() => handleDelete(record)}
            okText="Ha"
            cancelText="Yo‘q"
          >
            <Button danger size="small" loading={deletingId === record.id}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-8">
        <Spin tip="Yuklanmoqda..." />
      </div>
    );
  if (isError)
    return (
      <div className="py-8">
        <Empty
          description={<span className="text-white">Xatolik yuz berdi</span>}
        />
      </div>
    );

  return (
    <div className="p-4 bg-gray-900 rounded-xl shadow-lg">
      {contextHolder}

      {/* RESPONSIVE SEARCH AREA */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1 sm:flex-none w-full sm:w-[260px]">
          <Search
            placeholder="Ism bo‘yicha qidirish..."
            allowClear
            enterButton
            aria-label="Search by name"
            value={searchName}
            onSearch={(v) => setSearchName(v)}
            onChange={(e) => setSearchName(e.target.value)}
            size="middle"
            style={{ width: "100%" }}
          />
        </div>

        <div className="flex-1 sm:flex-none w-full sm:w-[260px]">
          <Search
            placeholder="Passport Code bo‘yicha qidirish..."
            allowClear
            enterButton
            aria-label="Search by passport"
            value={searchPassport}
            onSearch={(v) => setSearchPassport(v)}
            onChange={(e) => setSearchPassport(e.target.value)}
            size="middle"
            style={{ width: "100%" }}
          />
        </div>

        <div className="ml-auto flex gap-2">
          <Button
            onClick={() => {
              setSearchName("");
              setSearchPassport("");
            }}
          >
            Tozalash
          </Button>
          {/* agar backend search ishlatilsa refresh tugmasi */}
          <Button onClick={() => refetch()}>Yangilash</Button>
        </div>
      </div>

      {/* TABLE wrapper for horizontal scroll on small screens */}
      <div className="overflow-x-auto">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredFraudsters}
          pagination={{ pageSize: 7, showSizeChanger: false }}
          bordered={false}
          tableLayout="fixed"
          scroll={{ x: 800, y: 400 }}
          locale={{ emptyText: <Empty description="Hech nima topilmadi" /> }}
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
    </div>
  );
};

export default React.memo(FraudstersTable);
