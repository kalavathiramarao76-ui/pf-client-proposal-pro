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
        display: true,
        position: 'top',
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}`;
          },
        },
      },
    },
    interaction: {
      mode: 'nearest',
      intersect: false,
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  });

  useEffect(() => {
    if (realTimeData) {
      const labels = realTimeData.map((data) => data.date);
      const proposalsCreated = realTimeData.map((data) => data.proposalsCreated);
      const proposalsApproved = realTimeData.map((data) => data.proposalsApproved);
      setRealTimeProposalData({
        labels,
        datasets: [
          {
            label: 'Proposals Created',
            data: proposalsCreated,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
          {
            label: 'Proposals Approved',
            data: proposalsApproved,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1,
          },
        ],
      });
    }
  }, [realTimeData]);

  const handleDrillDown = (datasetIndex, index) => {
    const data = realTimeData[index];
    console.log(`Drill down to ${data.date} with ${data.proposalsCreated} proposals created and ${data.proposalsApproved} proposals approved`);
  };

  return (
    <DashboardLayout>
      <div className="container">
        <h1>Proposal Studio Dashboard</h1>
        <div className="row">
          <div className="col-md-6">
            <Line
              data={proposalData}
              options={chartOptions}
              onClick={(event, elements) => {
                if (elements.length > 0) {
                  const datasetIndex = elements[0].datasetIndex;
                  const index = elements[0].index;
                  handleDrillDown(datasetIndex, index);
                }
              }}
            />
          </div>
          <div className="col-md-6">
            <Line
              data={realTimeProposalData}
              options={chartOptions}
              onClick={(event, elements) => {
                if (elements.length > 0) {
                  const datasetIndex = elements[0].datasetIndex;
                  const index = elements[0].index;
                  handleDrillDown(datasetIndex, index);
                }
              }}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;