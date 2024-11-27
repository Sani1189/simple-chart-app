'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { fetchDataByRange } from '@/lib/fetchData';
import DateRangeFilter from './components/DateRangeFilter';
import ChartToggle from './components/ChartToggle';

const Chart = dynamic(() => import('./components/Chart'), { ssr: false });

type DateRange = 'last7Days' | 'last30Days';

interface DataPoint {
  date: string;
  sales: number;
  expenses: number;
}

export default function HomePage() {
  const [data, setData] = useState<{ dates: string[]; sales: number[]; expenses: number[] }>({
    dates: [],
    sales: [],
    expenses: [],
  });
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [dateRange, setDateRange] = useState<DateRange>('last7Days');

  useEffect(() => {
    async function fetchData() {
      const result = await fetchDataByRange(dateRange);

      if (result.randomData && Array.isArray(result.randomData)) {
        const fetchedData = result.randomData;

        const preparedData = {
          dates: fetchedData.map((item: DataPoint) => item.date),
          sales: fetchedData.map((item: DataPoint) => item.sales),
          expenses: fetchedData.map((item: DataPoint) => item.expenses),
        };

        setData(preparedData);
      } else {
        console.error('Expected randomData to be an array but got:', result.randomData);
      }
    }

    fetchData();
  }, [dateRange]);

  const handleChartTypeChange = (type: 'line' | 'bar') => {
    setChartType(type);
  };

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
  };

  if (data.dates.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-auto py-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mt-2 mb-6">Sales and Expenses Dashboard</h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <ChartToggle onChange={handleChartTypeChange} />
        <DateRangeFilter onChange={handleDateRangeChange} />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <Chart data={data} chartType={chartType} />
      </div>
    </div>
  );
}
