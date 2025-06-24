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

const aggregateByDate = (data) => {
  // Агрегируем count по датам
  const map = new Map();
  data.forEach(item => {
    if (map.has(item.date)) {
      map.set(item.date, map.get(item.date) + item.count);
    } else {
      map.set(item.date, item.count);
    }
  });
  // Сортируем по дате
  return Array.from(map.entries())
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .map(([date, count]) => ({ date, count }));
};

const DeliveryChart = ({ data }) => {
  const aggregated = aggregateByDate(data);
  const chartData = {
    labels: aggregated.map((item) => item.date),
    datasets: [
      {
        label: 'Количество доставок',
        data: aggregated.map((item) => item.count),
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