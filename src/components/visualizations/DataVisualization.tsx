'use client';

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
  ChartData,
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

interface DataVisualizationProps {
  heartbeats: number;
  breaths: number;
  earthRotations: number;
  solarOrbits: number;
}

export function DataVisualization({
  heartbeats,
  breaths,
  earthRotations,
  solarOrbits,
}: DataVisualizationProps) {
  const data: ChartData<'line'> = {
    labels: ['Birth', 'Current'],
    datasets: [
      {
        label: 'Heartbeats (millions)',
        data: [0, heartbeats / 1000000],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Breaths (millions)',
        data: [0, breaths / 1000000],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Earth Rotations (thousands)',
        data: [0, earthRotations / 1000],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Solar Orbits',
        data: [0, solarOrbits],
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Your Life Journey in Numbers',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <Line options={options} data={data} />
    </div>
  );
}