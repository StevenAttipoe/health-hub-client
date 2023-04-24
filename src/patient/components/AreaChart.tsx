import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface AreaChartProps {
  data: any;
}


const AreaChart: React.FC<AreaChartProps> = ({data}) => {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const gData = {
    labels,
    datasets: [
      {
        fill: true,
        data: values,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      // title: {
      //   display: true,
      //   text: 'Heart rate',
      // },
    },
  };

  return (
    
    <Line options={options} data={gData} />
  );
}

export default AreaChart;