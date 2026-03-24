'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { localStorage } from '../utils/localStorage';
import DashboardLayout from '../components/DashboardLayout';
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
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [proposalData, setProposalData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Proposals Created',
        data: [10, 20, 30, 40, 50],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Proposals Approved',
        data: [5, 10, 15, 20, 25],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  });
  const [chartOptions, setChartOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Proposal Creation and Approval Trend',
      },
    },
  });
  const [chartType, setChartType] = useState('line');
  const [datasetVisibility, setDatasetVisibility] = useState({
    'Proposals Created': true,
    'Proposals Approved': true,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const handleDatasetVisibilityChange = (datasetLabel) => {
    setDatasetVisibility((prevVisibility) => ({
      ...prevVisibility,
      [datasetLabel]: !prevVisibility[datasetLabel],
    }));
  };

  const filteredDatasets = proposalData.datasets.filter((dataset) => datasetVisibility[dataset.label]);

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="bg-white rounded shadow-md p-4 w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
          <h1 className="text-3xl font-bold mb-4 text-center">Welcome to Proposal Studio</h1>
          {user ? (
            <div className="text-center">
              <p className="text-lg">You are logged in as {user.name}</p>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <p className="text-lg text-center">You are not logged in</p>
          )}
        </div>
        <div className="mt-8 bg-white rounded shadow-md p-4 w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
          <h2 className="text-2xl font-bold mb-4 text-center">Proposal Analytics</h2>
          <div className="flex flex-col mb-4">
            <label className="text-lg mb-2">Chart Type:</label>
            <select value={chartType} onChange={handleChartTypeChange}>
              <option value="line">Line</option>
              <option value="bar">Bar</option>
            </select>
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-lg mb-2">Dataset Visibility:</label>
            {proposalData.datasets.map((dataset) => (
              <div key={dataset.label}>
                <input
                  type="checkbox"
                  checked={datasetVisibility[dataset.label]}
                  onChange={() => handleDatasetVisibilityChange(dataset.label)}
                />
                <span className="ml-2">{dataset.label}</span>
              </div>
            ))}
          </div>
          {chartType === 'line' ? (
            <Line
              data={{
                labels: proposalData.labels,
                datasets: filteredDatasets,
              }}
              options={chartOptions}
            />
          ) : (
            <div>Bar chart is not implemented yet</div>
          )}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/proposal-templates"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create a new proposal
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;