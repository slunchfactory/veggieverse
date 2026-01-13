import React, { useState } from 'react';

const STORE_TABS = ['밀키트', '베이커리', '간편식', '음료'];

const StoreList: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold p-8">Store List Page</h1>

      {/* Tabs */}
      <div className="flex border-b">
        {STORE_TABS.map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(index)}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === index
                ? 'border-b-2 border-black text-black'
                : 'text-gray-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-8">
        <p className="text-gray-600">현재 탭: {STORE_TABS[activeTab]}</p>
      </div>
    </div>
  );
};

export default StoreList;
