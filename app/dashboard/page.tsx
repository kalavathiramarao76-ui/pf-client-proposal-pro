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
  const [layout, setLayout] = useState({
    chart1: { x: 0, y: 0, width: 400, height: 200 },
    chart2: { x: 400, y: 0, width: 400, height: 200 },
    chart3: { x: 0, y: 200, width: 400, height: 200 },
  });

  useEffect(() => {
    if (realTimeData) {
      setRealTimeProposalData({
        labels: realTimeData.labels,
        datasets: [
          {
            label: 'Proposals Created',
            data: realTimeData.proposalsCreated,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
          {
            label: 'Proposals Approved',
            data: realTimeData.proposalsApproved,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1,
          },
        ],
      });
    }
  }, [realTimeData]);

  const handleLayoutChange = (chartId, newLayout) => {
    setLayout((prevLayout) => ({ ...prevLayout, [chartId]: newLayout }));
  };

  return (
    <DashboardLayout>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: layout.chart1.x,
            top: layout.chart1.y,
            width: layout.chart1.width,
            height: layout.chart1.height,
            border: '1px solid black',
            backgroundColor: 'white',
          }}
        >
          <Line
            data={proposalData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Proposals Created and Approved',
                },
              },
            }}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            left: layout.chart2.x,
            top: layout.chart2.y,
            width: layout.chart2.width,
            height: layout.chart2.height,
            border: '1px solid black',
            backgroundColor: 'white',
          }}
        >
          <Bar
            data={realTimeProposalData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Real-time Proposals Created and Approved',
                },
              },
            }}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            left: layout.chart3.x,
            top: layout.chart3.y,
            width: layout.chart3.width,
            height: layout.chart3.height,
            border: '1px solid black',
            backgroundColor: 'white',
          }}
        >
          <Pie
            data={realTimeProposalData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Real-time Proposals Created and Approved (Pie Chart)',
                },
              },
            }}
          />
        </div>
      </div>
      <button
        onClick={() =>
          handleLayoutChange('chart1', { x: 100, y: 100, width: 300, height: 150 })
        }
      >
        Change Chart 1 Layout
      </button>
      <button
        onClick={() =>
          handleLayoutChange('chart2', { x: 500, y: 100, width: 300, height: 150 })
        }
      >
        Change Chart 2 Layout
      </button>
      <button
        onClick={() =>
          handleLayoutChange('chart3', { x: 100, y: 300, width: 300, height: 150 })
        }
      >
        Change Chart 3 Layout
      </button>
    </DashboardLayout>
  );
};

export default DashboardPage;