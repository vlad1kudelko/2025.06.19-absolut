import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DeliveryChart = ({ data }) => {
  // data: [{ date: '2024-06-01', count: 5 }, ...]
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: 'Количество доставок',
        data: data.map((item) => item.count),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Доставки по дням',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default DeliveryChart; 