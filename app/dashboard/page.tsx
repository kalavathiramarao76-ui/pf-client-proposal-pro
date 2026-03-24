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
  const [filter, setFilter] = useState({
    status: '',
    dateRange: '',
  });
  const [sortedData, setSortedData] = useState(proposalData);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
    const filteredData = proposalData.datasets.filter((dataset) => {
      if (name === 'status') {
        return dataset.label.includes(value);
      } else if (name === 'dateRange') {
        return dataset.data.includes(value);
      }
    });
    setSortedData(filteredData);
  };

  const handleSortChange = (event) => {
    const { name, value } = event.target;
    const sortedData = proposalData.datasets.sort((a, b) => {
      if (name === 'label') {
        return a.label.localeCompare(b.label);
      } else if (name === 'data') {
        return a.data[0] - b.data[0];
      }
    });
    setSortedData(sortedData);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-center items-center md:space-x-4 space-y-4 md:space-y-0">
        <div className="w-full md:w-1/2 xl:w-1/3 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Proposal Creation Trend</h2>
          <Line
            data={sortedData}
            options={chartOptions}
            className="h-64"
          />
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Proposal Approval Trend</h2>
          <Bar
            data={sortedData}
            options={chartOptions}
            className="h-64"
          />
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Proposal Status</h2>
          <Pie
            data={widgets[2].data}
            options={chartOptions}
            className="h-64"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center md:space-x-4 space-y-4 md:space-y-0">
        <select
          name="status"
          value={filter.status}
          onChange={handleFilterChange}
          className="w-full md:w-1/2 xl:w-1/3 p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-200"
        >
          <option value="">Select Status</option>
          <option value="Proposals Created">Proposals Created</option>
          <option value="Proposals Approved">Proposals Approved</option>
        </select>
        <select
          name="dateRange"
          value={filter.dateRange}
          onChange={handleFilterChange}
          className="w-full md:w-1/2 xl:w-1/3 p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-200"
        >
          <option value="">Select Date Range</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
        </select>
        <select
          name="label"
          value=""
          onChange={handleSortChange}
          className="w-full md:w-1/2 xl:w-1/3 p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-200"
        >
          <option value="">Sort By Label</option>
          <option value="label">Label</option>
        </select>
        <select
          name="data"
          value=""
          onChange={handleSortChange}
          className="w-full md:w-1/2 xl:w-1/3 p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-200"
        >
          <option value="">Sort By Data</option>
          <option value="data">Data</option>
        </select>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;