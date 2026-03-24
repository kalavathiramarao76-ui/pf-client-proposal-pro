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
import { Line, Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';

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
  const [realTimeProposalData, setRealTimeProposalData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Proposals Created',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Proposals Approved',
        data: [],
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
    const fetchRealTimeData = async () => {
      try {
        const response = await axios.get('/api/proposal-analytics');
        const data = response.data;
        setRealTimeProposalData({
          labels: data.labels,
          datasets: [
            {
              label: 'Proposals Created',
              data: data.proposalsCreated,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
            {
              label: 'Proposals Approved',
              data: data.proposalsApproved,
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchRealTimeData();
    const intervalId = setInterval(fetchRealTimeData, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const handleDatasetVisibilityChange = (event) => {
    const dataset = event.target.name;
    const visibility = event.target.checked;
    setDatasetVisibility((prevVisibility) => ({ ...prevVisibility, [dataset]: visibility }));
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Proposal Studio Dashboard</h1>
        <div className="flex flex-row justify-center mb-4">
          <select value={chartType} onChange={handleChartTypeChange} className="mr-4">
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="pie">Pie Chart</option>
          </select>
          <div>
            <label>
              <input
                type="checkbox"
                name="Proposals Created"
                checked={datasetVisibility['Proposals Created']}
                onChange={handleDatasetVisibilityChange}
              />
              Proposals Created
            </label>
            <label className="ml-4">
              <input
                type="checkbox"
                name="Proposals Approved"
                checked={datasetVisibility['Proposals Approved']}
                onChange={handleDatasetVisibilityChange}
              />
              Proposals Approved
            </label>
          </div>
        </div>
        {chartType === 'line' && (
          <Line
            data={realTimeProposalData}
            options={chartOptions}
            datasetVisibility={datasetVisibility}
          />
        )}
        {chartType === 'bar' && (
          <Bar
            data={realTimeProposalData}
            options={chartOptions}
            datasetVisibility={datasetVisibility}
          />
        )}
        {chartType === 'pie' && (
          <Pie
            data={realTimeProposalData}
            options={chartOptions}
            datasetVisibility={datasetVisibility}
          />
        )}
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;