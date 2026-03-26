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
import { io } from 'socket.io-client';

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

const socket = io();

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

    const intervalId = setInterval(async () => {
      try {
        const data = await getRealTimeData();
        setRealTimeData(data);
      } catch (error) {
        setError(error);
      }
    }, cacheDuration);

    socket.on('proposal-analytics', (data) => {
      setRealTimeData(data);
    });

    return () => {
      socket.off('proposal-analytics');
      clearInterval(intervalId);
    };
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

  useEffect(() => {
    if (realTimeData) {
      const updatedData = {
        labels: realTimeData.labels,
        datasets: realTimeData.datasets.map((dataset) => ({
          ...dataset,
          data: dataset.data.map((value) => value),
        })),
      };
      setRealTimeProposalData(updatedData);
    }
  }, [realTimeData]);

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Proposal Studio Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-bold mb-2">Proposals Created</h2>
            <Line
              data={realTimeProposalData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                  },
                },
              }}
            />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-bold mb-2">Proposals Approved</h2>
            <Bar
              data={realTimeProposalData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;