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

  console.log(data?.count);
  console.log(myCount, "lj");

  return (
    <div className="p-6 space-y-6">
      {/* Sarlavha */}
      <h2 className="text-2xl font-bold text-white">Boshqaruv paneli</h2>

      {/* Statistikalar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded text-white">
          <h1>Firibgarlar soni : {data?.count ?? 0}</h1>
        </div>
        <div className="bg-gray-800 p-4 rounded text-white">
          <h1>Shu oydagi</h1>
        </div>
        <div className="bg-gray-800 p-4 rounded text-white">
          <h1>Men qo'shgan : {myCount?.count ?? 0}</h1>
        </div>
      </div>

      <div className="text-center my-4">
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
