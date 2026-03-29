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

const cacheDuration = 5000; 

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
  }, [realTimeData]);

  return { realTimeData, loading, error };
};

const useOptimizedRealTimeData = () => {
  const { realTimeData, loading, error } = useRealTimeData();
  const [optimizedData, setOptimizedData] = useState(null);

  useEffect(() => {
    if (realTimeData) {
      const optimizedData = JSON.parse(JSON.stringify(realTimeData));
      setOptimizedData(optimizedData);
    }
  }, [realTimeData]);

  return { optimizedData, loading, error };
};

const DashboardPage = () => {
  const router = useRouter();
  const { realTimeData, loading, error } = useRealTimeData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <DashboardLayout>
      {/* Your dashboard content here */}
    </DashboardLayout>
  );
};

export default DashboardPage;