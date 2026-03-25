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

const cache = {
  proposalData: null,
  timestamp: null,
};

const cacheDuration = 5000; // 5 seconds

const fetchRealTimeData = async () => {
  try {
    const response = await axios.get('/api/proposal-analytics');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getRealTimeData = async () => {
  if (cache.proposalData && Date.now() - cache.timestamp < cacheDuration) {
    return cache.proposalData;
  }
  const data = await fetchRealTimeData();
  cache.proposalData = data;
  cache.timestamp = Date.now();
  return data;
};

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
  const [widgets, setWidgets] = useState([
    {
      id: 1,
      type: 'line',
      title: 'Proposal Creation Trend',
      data: proposalData,
    },
    {
      id: 2,
      type: 'bar',
      title: 'Proposal Approval Trend',
      data: proposalData,
    },
    {
      id: 3,
      type: 'pie',
      title: 'Proposal Status',
      data: {
        labels: ['Created', 'Approved', 'Rejected'],
        datasets: [
          {
            label: 'Proposal Status',
            data: [10, 20, 30],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
    },
  ]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const data = await getRealTimeData();
      if (data) {
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
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const handleDatasetVisibilityChange = (event) => {
    const dataset = event.target.dataset;
    const visibility = event.target.checked;
    setDatasetVisibility((prevVisibility) => ({
      ...prevVisibility,
      [dataset]: visibility,
    }));
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Proposal Studio Dashboard</h1>
          <select
            value={chartType}
            onChange={handleChartTypeChange}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="pie">Pie Chart</option>
          </select>
        </div>
        <div className="flex flex-col mb-4">
          {widgets.map((widget) => (
            <div key={widget.id} className="mb-4">
              <h2 className="text-xl font-bold">{widget.title}</h2>
              {widget.type === 'line' && (
                <Line
                  options={chartOptions}
                  data={widget.data}
                  datasetVisibility={datasetVisibility}
                />
              )}
              {widget.type === 'bar' && (
                <Bar
                  options={chartOptions}
                  data={widget.data}
                  datasetVisibility={datasetVisibility}
                />
              )}
              {widget.type === 'pie' && (
                <Pie
                  options={chartOptions}
                  data={widget.data}
                  datasetVisibility={datasetVisibility}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col mb-4">
          <h2 className="text-xl font-bold">Real-time Proposal Data</h2>
          {chartType === 'line' && (
            <Line
              options={chartOptions}
              data={realTimeProposalData}
              datasetVisibility={datasetVisibility}
            />
          )}
          {chartType === 'bar' && (
            <Bar
              options={chartOptions}
              data={realTimeProposalData}
              datasetVisibility={datasetVisibility}
            />
          )}
          {chartType === 'pie' && (
            <Pie
              options={chartOptions}
              data={realTimeProposalData}
              datasetVisibility={datasetVisibility}
            />
          )}
        </div>
        <div className="flex flex-col mb-4">
          <h2 className="text-xl font-bold">Dataset Visibility</h2>
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={datasetVisibility['Proposals Created']}
                onChange={handleDatasetVisibilityChange}
                dataset="Proposals Created"
                className="mr-2"
              />
              <span>Proposals Created</span>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={datasetVisibility['Proposals Approved']}
                onChange={handleDatasetVisibilityChange}
                dataset="Proposals Approved"
                className="mr-2"
              />
              <span>Proposals Approved</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;