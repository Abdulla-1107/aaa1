import React from "react";
import { useFraudsters } from "../../api/service/useFraudster";
import { useMyFraudsters } from "../../api/service/myFraudster";
import FraudsterTable from "../../components/FraudsterTable";
import { Spin, Alert } from "antd";

const Home = () => {
  const { data, isLoading, error } = useFraudsters();
  const { data: myCount } = useMyFraudsters();

  if (isLoading) return <Spin tip="Yuklanmoqda..." fullscreen />;
  if (error)
    return <Alert message="Xatolik yuz berdi!" type="error" showIcon />;

  console.log(data);
  console.log(myCount, "lj");

  return (
    <div className="p-6 space-y-6">
      {/* Sarlavha */}
      <h2 className="text-2xl font-bold text-white mb-6">Boshqaruv paneli</h2>

      {/* Statistikalar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Firibgarlar soni */}
        <div className="bg-gray-900 border border-purple-400 rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">Firibgarlar soni</p>
            <span className="text-gray-400">👥</span>
          </div>
          <h1 className="text-3xl font-bold text-white mt-2">
            {data?.count ?? 0}
          </h1>
          <p className="text-gray-400 text-sm mt-1">Jami</p>
        </div>

        {/* Shu oydagi */}
        <div className="bg-gray-900 rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">Shu oydagi</p>
            <span className="text-gray-400">📈</span>
          </div>
          <h1 className="text-3xl font-bold text-white mt-2">
            {data?.monthlyCount ?? 0}
          </h1>
          <p className="text-gray-400 text-sm mt-1">Oxirgi 30 davomida</p>
        </div>

        {/* Men qo‘shgan */}
        <div className="bg-gray-900 rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">Men qo‘shgan</p>
            <span className="text-gray-400">🔍</span>
          </div>
          <h1 className="text-3xl font-bold text-white mt-2">
            {myCount?.count ?? 0}
          </h1>
          <p className="text-gray-400 text-sm mt-1">Jami</p>
        </div>
      </div>

      {/* Ro‘yxat sarlavhasi */}
      <div className="text-center my-6">
        <p className="font-bold text-xl text-white">Firibgarlar ro'yxati</p>
      </div>

      {/* Jadval container */}
      <div className="bg-gray-900 p-4 rounded mt-6 overflow-x-auto">
        <FraudsterTable />
      </div>
    </div>
  );
};

export default React.memo(Home);
