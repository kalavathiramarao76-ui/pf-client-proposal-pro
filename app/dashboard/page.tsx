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

  const handleWidgetAdd = () => {
    setWidgets([
      ...widgets,
      {
        id: widgets.length + 1,
        type: 'line',
        title: `Widget ${widgets.length + 1}`,
        data: proposalData,
      },
    ]);
  };

  const handleWidgetRemove = (id) => {
    setWidgets(widgets.filter((widget) => widget.id !== id));
  };

  const handleWidgetTypeChange = (id, type) => {
    setWidgets(
      widgets.map((widget) =>
        widget.id === id ? { ...widget, type: type } : widget
      )
    );
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Proposal Studio Dashboard</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleWidgetAdd}
          >
            Add Widget
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {widgets.map((widget) => (
            <div key={widget.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-bold mb-2">{widget.title}</h2>
              {widget.type === 'line' && (
                <Line
                  data={widget.data}
                  options={chartOptions}
                  className="h-64"
                />
              )}
              {widget.type === 'bar' && (
                <Bar
                  data={widget.data}
                  options={chartOptions}
                  className="h-64"
                />
              )}
              {widget.type === 'pie' && (
                <Pie
                  data={widget.data}
                  options={chartOptions}
                  className="h-64"
                />
              )}
              <div className="flex justify-between mt-4">
                <select
                  value={widget.type}
                  onChange={(e) => handleWidgetTypeChange(widget.id, e.target.value)}
                  className="bg-gray-100 p-2 rounded"
                >
                  <option value="line">Line</option>
                  <option value="bar">Bar</option>
                  <option value="pie">Pie</option>
                </select>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleWidgetRemove(widget.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;