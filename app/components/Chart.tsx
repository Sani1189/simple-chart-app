'use client';

import { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  zoomPlugin
);

interface ChartProps {
  data: {
    dates: string[];
    sales: number[];
    expenses: number[];
  };
  chartType: 'line' | 'bar';
}

// Extend the dataset type to include additional properties like `pointRadius` and `pointHoverRadius`.
interface ExtendedDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  pointRadius?: number; // Optional for bar charts
  pointHoverRadius?: number; // Optional for bar charts
}

interface ChartData {
  labels: string[];
  datasets: ExtendedDataset[];
}

const Chart = ({ data, chartType }: ChartProps) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    if (data && data.dates.length > 0 && data.sales.length > 0 && data.expenses.length > 0) {
      const preparedChartData: ChartData = {
        labels: data.dates,
        datasets: [
          {
            label: 'Sales',
            data: data.sales,
            borderColor: 'rgb(0, 102, 204)', // Deep blue for Sales
            backgroundColor: 'rgba(0, 102, 204, 0.6)', // Rich blue with moderate opacity
            pointRadius: chartType === 'line' ? 5 : undefined, // Add point radius only for line charts
            pointHoverRadius: chartType === 'line' ? 8 : undefined, // Add hover radius only for line charts
          },
          {
            label: 'Expenses',
            data: data.expenses,
            borderColor: 'rgb(204, 0, 0)', // Deep red for Expenses
            backgroundColor: 'rgba(204, 0, 0, 0.6)', // Rich red with moderate opacity
            pointRadius: chartType === 'line' ? 5 : undefined,
            pointHoverRadius: chartType === 'line' ? 8 : undefined,
          },
        ],
      };
      setChartData(preparedChartData);
    }
  }, [data, chartType]);

  if (!chartData) {
    return (
      <div className="flex justify-center items-center h-[600px]">
        <p className="text-lg font-medium text-gray-500">Loading Chart...</p>
      </div>
    );
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#374151', // Dark gray for legend text
        },
      },
      tooltip: {
        callbacks: {
          title: (context: any) => `Date: ${context[0].label}`,
          label: (context: any) => `${context.dataset.label}: ${context.raw}`,
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x', // Allow panning only horizontally
          modifierKey: 'ctrl', // Use Ctrl key to activate panning
        },
        zoom: {
          wheel: {
            enabled: true, // Enable zooming with the mouse wheel
          },
          pinch: {
            enabled: true, // Enable zooming on touch devices
          },
          mode: 'x', // Restrict zooming to the X-axis
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Date', color: '#374151' },
        grid: {
          color: 'rgba(209, 213, 219, 0.3)', // Light gray grid
        },
      },
      y: {
        title: { display: true, text: 'Amount', color: '#374151' },
        grid: {
          color: 'rgba(209, 213, 219, 0.3)', // Light gray grid
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  return (
    <div className="bg-gray-100 shadow-md rounded-lg p-6 flex justify-center items-center h-[600px]">
      <div className="relative w-full max-w-5xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          {chartType === 'line' ? 'Line Chart' : 'Bar Chart'}
        </h2>
        {chartType === 'line' ? (
          <Line data={chartData} options={options as any} />
        ) : (
          <Bar data={chartData} options={options as any} />
        )}
      </div>
    </div>
  );
};

export default Chart;
