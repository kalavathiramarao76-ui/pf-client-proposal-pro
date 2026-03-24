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

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const fetchRealTimeData = async () => {
      try {
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
      } catch (error) {
        console.error(error);
      }
    };
    fetchRealTimeData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
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
      } catch (error) {
        console.error(error);
      }
    }, cacheDuration);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <DashboardLayout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2>Proposal Studio Dashboard</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Line
              options={chartOptions}
              data={proposalData}
              className="chart"
            />
          </div>
          <div className="col-md-6">
            {chartType === 'line' ? (
              <Line
                options={chartOptions}
                data={realTimeProposalData}
                className="chart"
              />
            ) : chartType === 'bar' ? (
              <Bar
                options={chartOptions}
                data={realTimeProposalData}
                className="chart"
              />
            ) : (
              <Pie
                options={chartOptions}
                data={realTimeProposalData}
                className="chart"
              />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;