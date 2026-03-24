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

  const handleLogoClick = () => {
    router.push('/');
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
      <div className="flex flex-col h-screen">
        <header className="bg-white py-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-lg font-bold">
              Proposal Studio
            </Link>
            <button onClick={handleLogoClick} className="text-lg font-bold">
              Logo
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="flex flex-col md:flex-row justify-center mb-4">
              <select
                value={chartType}
                onChange={handleChartTypeChange}
                className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-4 p-2 border border-gray-400 rounded"
              >
                <option value="line">Line Chart</option>
                <option value="bar">Bar Chart</option>
                <option value="pie">Pie Chart</option>
              </select>
              <div className="flex flex-col w-full md:w-1/2">
                <label>
                  <input
                    type="checkbox"
                    name="Proposals Created"
                    checked={datasetVisibility['Proposals Created']}
                    onChange={handleDatasetVisibilityChange}
                  />
                  Proposals Created
                </label>
                <label>
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
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;