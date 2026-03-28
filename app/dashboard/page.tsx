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

const cacheDuration = 500; 

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
        if (data !== realTimeData) {
          setRealTimeData(data);
        }
      } catch (error) {
        setError(error);
      }
    }, cacheDuration);

    socket.on('proposal-analytics', (data) => {
      if (data !== realTimeData) {
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
        data: [5, 10, 15, 20, 25],
        borderColor: 'rgb(53, 162, 235)',
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    if (realTimeData) {
      setProposalData({
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
            borderColor: 'rgb(53, 162, 235)',
            tension: 0.1,
          },
        ],
      });
    }
  }, [realTimeData]);

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-8/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                  <div className="relative w-full max-w-full flex-grow flex-1">
                    <h5 className="text-gray-500 uppercase font-bold text-xs">
                      Proposal Analytics
                    </h5>
                    <span className="font-semibold text-xl text-gray-800">
                      {realTimeData && realTimeData.proposalsCreated.length} Proposals
                    </span>
                  </div>
                </div>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                  <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                      <div className="relative w-full max-w-full flex-grow flex-1">
                        <h6 className="uppercase text-gray-500 mb-1 text-xs font-semibold">
                          Overview
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex-auto">
                    <div className="relative h-350-px">
                      <Line
                        data={proposalData}
                        options={{
                          maintainAspectRatio: false,
                          legend: {
                            display: false,
                          },
                          tooltips: {
                            backgroundColor: '#f5f5f5',
                            titleFontColor: '#333',
                            bodyFontColor: '#666',
                            bodySpacing: 4,
                            xPadding: 12,
                            mode: 'nearest',
                            intersect: 0,
                            position: 'nearest',
                          },
                          scales: {
                            yAxes: [
                              {
                                barPercentage: 1.6,
                                gridLines: {
                                  drawBorder: false,
                                  color: 'rgba(29,140,248,0.0)',
                                  zeroLineColor: 'transparent',
                                },
                                ticks: {
                                  suggestedMin: 0,
                                  suggestedMax: 500,
                                  beginAtZero: true,
                                  padding: 20,
                                  fontColor: '#9e9e9e',
                                },
                              },
                            ],
                            xAxes: [
                              {
                                barPercentage: 1.6,
                                gridLines: {
                                  drawBorder: false,
                                  color: 'rgba(29,140,248,0.0)',
                                  zeroLineColor: 'transparent',
                                },
                                ticks: {
                                  padding: 20,
                                  fontColor: '#9e9e9e',
                                },
                              },
                            ],
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;