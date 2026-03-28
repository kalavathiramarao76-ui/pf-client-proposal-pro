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

const cacheDuration = 5000; // increased cache duration to 5 seconds

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
        if (JSON.stringify(data) !== JSON.stringify(realTimeData)) {
          setRealTimeData(data);
        }
      } catch (error) {
        setError(error);
      }
    }, cacheDuration);

    socket.on('proposal-analytics', (data) => {
      if (JSON.stringify(data) !== JSON.stringify(realTimeData)) {
        setRealTimeData(data);
        cache.proposalData = data;
        cache.timestamp = Date.now();
      }
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
  const { realTimeData, loading, error } = useRealTimeData();
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
        data: [20, 40, 60, 80, 100],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  });

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-1/2 xl:w-1/3 p-6">
            <div className="bg-white rounded shadow-md p-4">
              <h2 className="text-lg font-bold mb-2">Proposals Created</h2>
              <Line
                data={proposalData}
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
          <div className="w-full lg:w-1/2 xl:w-1/3 p-6">
            <div className="bg-white rounded shadow-md p-4">
              <h2 className="text-lg font-bold mb-2">Proposals Approved</h2>
              <Bar
                data={proposalData}
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
          <div className="w-full lg:w-1/2 xl:w-1/3 p-6">
            <div className="bg-white rounded shadow-md p-4">
              <h2 className="text-lg font-bold mb-2">Proposals by Status</h2>
              <Pie
                data={proposalData}
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
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;