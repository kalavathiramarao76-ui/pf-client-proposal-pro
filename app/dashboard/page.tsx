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
  const [filterOptions, setFilterOptions] = useState({
    dateRange: 'all',
    proposalStatus: 'all',
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterOptions((prevFilterOptions) => ({
      ...prevFilterOptions,
      [name]: value,
    }));
  };

  const handleDatasetVisibilityChange = (datasetLabel, visibility) => {
    setDatasetVisibility((prevDatasetVisibility) => ({
      ...prevDatasetVisibility,
      [datasetLabel]: visibility,
    }));
  };

  const filteredProposalData = () => {
    const filteredData = { ...proposalData };
    if (filterOptions.dateRange !== 'all') {
      const startDate = new Date(filterOptions.dateRange.split(',')[0]);
      const endDate = new Date(filterOptions.dateRange.split(',')[1]);
      filteredData.labels = filteredData.labels.filter((label, index) => {
        const date = new Date(label);
        return date >= startDate && date <= endDate;
      });
      filteredData.datasets.forEach((dataset) => {
        dataset.data = dataset.data.filter((data, index) => {
          const date = new Date(filteredData.labels[index]);
          return date >= startDate && date <= endDate;
        });
      });
    }
    if (filterOptions.proposalStatus !== 'all') {
      filteredData.datasets = filteredData.datasets.filter((dataset) => {
        return dataset.label === filterOptions.proposalStatus;
      });
    }
    return filteredData;
  };

  const drillDownData = (datasetLabel, index) => {
    const drillDownData = {
      labels: [],
      datasets: [
        {
          label: datasetLabel,
          data: [],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
    const dataset = proposalData.datasets.find((dataset) => dataset.label === datasetLabel);
    drillDownData.labels = proposalData.labels.map((label) => label + ' ' + datasetLabel);
    drillDownData.datasets[0].data = dataset.data.map((data, index) => data * (index + 1));
    return drillDownData;
  };

  return (
    <DashboardLayout>
      <div className="filters">
        <label>Date Range:</label>
        <select name="dateRange" value={filterOptions.dateRange} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="2022-01-01,2022-01-31">January 2022</option>
          <option value="2022-02-01,2022-02-28">February 2022</option>
        </select>
        <label>Proposal Status:</label>
        <select name="proposalStatus" value={filterOptions.proposalStatus} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="Proposals Created">Proposals Created</option>
          <option value="Proposals Approved">Proposals Approved</option>
        </select>
      </div>
      <div className="charts">
        {widgets.map((widget) => (
          <div key={widget.id}>
            <h2>{widget.title}</h2>
            {widget.type === 'line' && (
              <Line
                data={filteredProposalData()}
                options={chartOptions}
                datasetVisibility={datasetVisibility}
                onDatasetVisibilityChange={handleDatasetVisibilityChange}
              />
            )}
            {widget.type === 'bar' && (
              <Bar
                data={filteredProposalData()}
                options={chartOptions}
                datasetVisibility={datasetVisibility}
                onDatasetVisibilityChange={handleDatasetVisibilityChange}
              />
            )}
            {widget.type === 'pie' && (
              <Pie
                data={widget.data}
                options={chartOptions}
                datasetVisibility={datasetVisibility}
                onDatasetVisibilityChange={handleDatasetVisibilityChange}
              />
            )}
            <button onClick={() => console.log(drillDownData('Proposals Created', 0))}>
              Drill Down
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;