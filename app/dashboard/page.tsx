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
    const response = await axios.get('/api/proposal-analytics', {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
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

const useRealTimeData = () => {
  const [realTimeData, setRealTimeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndCacheData = async () => {
      try {
        const data = await getRealTimeData();
        setRealTimeData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchAndCacheData();

    const intervalId = setInterval(fetchAndCacheData, cacheDuration);
    return () => clearInterval(intervalId);
  }, []);

  return { realTimeData, loading, error };
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
  const { realTimeData, loading, error } = useRealTimeData();
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
    if (realTimeData) {
      setRealTimeProposalData({
        labels: realTimeData.labels,
        datasets: [
          {
            label: 'Proposals Created',
            data: realTimeData.datasets[0].data,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
          {
            label: 'Proposals Approved',
            data: realTimeData.datasets[1].data,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1,
          },
        ],
      });
    }
  }, [realTimeData]);

  return (
    <DashboardLayout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Proposal Studio Dashboard</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error.message}</p>
            ) : (
              <Line
                options={chartOptions}
                data={realTimeProposalData}
              />
            )}
          </div>
          <div className="col-md-6">
            <Bar
              options={chartOptions}
              data={proposalData}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Pie
              options={chartOptions}
              data={widgets[2].data}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;