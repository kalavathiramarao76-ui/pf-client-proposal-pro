'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { localStorage } from '../utils/localStorage';
import DashboardLayout from '../components/DashboardLayout';

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Welcome to Proposal Studio</h1>
        {user ? (
          <div>
            <p className="text-lg">You are logged in as {user.name}</p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-lg">You are not logged in</p>
        )}
        <div className="mt-8">
          <Link
            href="/proposal-templates"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create a new proposal
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;