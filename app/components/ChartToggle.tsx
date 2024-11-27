// components/ChartToggle.tsx
'use client';

import { useState } from 'react';

const ChartToggle = ({ onChange }: { onChange: (type: 'line' | 'bar') => void }) => {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  const handleToggle = (type: 'line' | 'bar') => {
    setChartType(type);
    onChange(type);
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => handleToggle('line')}
        className={`px-4 py-2 rounded-md text-sm font-medium ${
          chartType === 'line'
            ? 'bg-indigo-600 text-white shadow'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Line Chart
      </button>
      <button
        onClick={() => handleToggle('bar')}
        className={`px-4 py-2 rounded-md text-sm font-medium ${
          chartType === 'bar'
            ? 'bg-indigo-600 text-white shadow'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Bar Chart
      </button>
    </div>
  );
};

export default ChartToggle;
