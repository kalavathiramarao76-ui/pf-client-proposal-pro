'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { motion } from 'framer-motion';

interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
}

const features: Feature[] = [
  {
    title: 'Customizable Proposal Templates',
    description: 'Create professional proposals with our customizable templates',
    icon: <AiOutlineArrowRight />,
  },
  {
    title: 'Client Database and Management',
    description: 'Manage your clients and their proposals in one place',
    icon: <AiOutlineArrowRight />,
  },
  {
    title: 'Proposal Analytics and Tracking',
    description: 'Track the performance of your proposals and optimize for success',
    icon: <AiOutlineArrowRight />,
  },
  {
    title: 'Integration with Popular Payment Gateways',
    description: 'Get paid faster with our seamless payment gateway integrations',
    icon: <AiOutlineArrowRight />,
  },
  {
    title: 'Collaboration Tools for Teams',
    description: 'Work with your team to create and manage proposals',
    icon: <AiOutlineArrowRight />,
  },
  {
    title: 'Branding and White-Labeling Options',
    description: 'Customize the look and feel of your proposals to match your brand',
    icon: <AiOutlineArrowRight />,
  },
];

const Page = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode !== null) {
      setDarkMode(storedDarkMode === 'true');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', String(!darkMode));
  };

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'dark' : ''}`}>
      <header className="bg-white dark:bg-gray-900 py-4">
        <nav className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-lg font-bold">
            Proposal Studio
          </Link>
          <button
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 py-2 px-4 rounded"
            onClick={toggleDarkMode}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="bg-gradient-to-r from-blue-500 to-purple-500 py-12">
          <div className="container mx-auto text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Proposal Studio</h1>
            <p className="text-2xl mb-8">
              Create, manage, and track proposals with ease
            </p>
            <Link
              href="/dashboard"
              className="bg-white hover:bg-gray-100 py-2 px-4 rounded"
            >
              Get Started
            </Link>
          </div>
        </section>
        <section className="py-12">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-4">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-900 py-4 px-6 rounded shadow"
                >
                  <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-lg">{feature.description}</p>
                  {feature.icon}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Page;