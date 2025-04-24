import React from 'react';

type Bank = {
  name: string;
  logo: string;
};

type Props = {
  banks: Bank[];
  onSelect: (bank: Bank) => void;
  onClose: () => void;
};

const BankSelector: React.FC<Props> = ({ banks, onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
        <h3 className="text-lg font-bold mb-4">업체명 선택</h3>
        <div className="grid grid-cols-3 gap-2">
          {banks.map((bank) => (
            <button
              key={bank.name}
              className="border rounded p-2 flex flex-col items-center hover:bg-blue-50"
              onClick={() => {
                onSelect(bank);
                onClose();
              }}
            >
              <img
                src={bank.logo}
                alt={bank.name}
                className="w-6 h-6 mb-1"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span>{bank.name}</span>
            </button>
          ))}
        </div>
        <div className="text-right mt-4">
          <button
            onClick={onClose}
            className="text-sm text-gray-600 hover:underline"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankSelector;
