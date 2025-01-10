import React from 'react';

const CryptoCard = ({ title, value, valueColor = 'text-gray-900' }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-500 mb-2">{title}</h2>
      <p className={`text-3xl font-bold ${valueColor}`}>{value}</p>
    </div>
  );
};

export default CryptoCard;
