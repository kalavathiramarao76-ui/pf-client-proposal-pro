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
import { tippy } from 'tippy.js';
import 'tippy.js/dist/tippy.css';

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

    const intervalId = setInterval(() => {
      fetchAndCacheData();
    }, cacheDuration);
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

  useEffect(() => {
    tippy('.tooltip', {
      content: 'This is a tooltip',
      placement: 'right',
      theme: 'light',
    });
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Proposal Studio Dashboard</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-bold mb-2">Proposals Created</h2>
            <Line
              data={proposalData}
              options={{
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const label = context.dataset.label || '';
                        const value = context.formattedValue;
                        return `${label}: ${value}`;
                      },
                    },
                  },
                },
              }}
            />
            <div className="tooltip">Hover over the chart for more information</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-bold mb-2">Proposals Approved</h2>
            <Bar
              data={proposalData}
              options={{
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const label = context.dataset.label || '';
                        const value = context.formattedValue;
                        return `${label}: ${value}`;
                      },
                    },
                  },
                },
              }}
            />
            <div className="tooltip">Hover over the chart for more information</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow mt-4">
          <h2 className="text-2xl font-bold mb-2">Real-time Proposal Data</h2>
          <Line
            data={realTimeProposalData}
            options={{
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const label = context.dataset.label || '';
                      const value = context.formattedValue;
                      return `${label}: ${value}`;
                    },
                  },
                },
              },
            }}
          />
          <div className="tooltip">Hover over the chart for more information</div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;