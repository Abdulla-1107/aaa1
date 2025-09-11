import React from "react";

const Home = () => {
  return (
    <div className="p-6">
      {/* Sarlavha */}
      <h2 className="text-2xl font-bold text-white mb-6">Boshqaruv paneli</h2>

      {/* 3 qatordan iborat divlar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded  text-white">
          <h1>Firibgarlar soni</h1>
        </div>
        <div className="bg-gray-800 p-4 rounded text-white">
            <h1>Shu oydagi</h1>
        </div>
        <div className="bg-gray-800 p-4 rounded text-white">
            <h1>Men qo'shgan</h1>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Home);
