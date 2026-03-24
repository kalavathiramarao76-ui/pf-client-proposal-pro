'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { FaGithub, FaTwitter } from 'react-icons/fa';

export default function Page() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <Hero />
      <Features />
      <Pricing />
      <Faq />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500">
      <h1 className="text-5xl font-bold text-white">Proposal Studio</h1>
      <p className="text-2xl text-white">Streamline your proposal process and win more clients</p>
      <Link href="/dashboard" className="btn btn-primary mt-4">
        Get Started <AiOutlineArrowRight className="ml-2" />
      </Link>
    </section>
  );
}

function Features() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <Feature
          title="Customizable Proposal Templates"
          description="Create professional-looking proposals with our customizable templates"
        />
        <Feature
          title="Client Database and Management"
          description="Organize and manage your clients with ease"
        />
        <Feature
          title="Proposal Analytics and Tracking"
          description="Track the performance of your proposals and optimize for success"
        />
        <Feature
          title="Integration with Popular Payment Gateways"
          description="Get paid faster with our seamless payment gateway integrations"
        />
        <Feature
          title="Collaboration Tools for Teams"
          description="Work with your team to create and manage proposals"
        />
        <Feature
          title="Branding and White-Labeling Options"
          description="Customize the look and feel of your proposals to match your brand"
        />
      </div>
    </section>
  );
}

function Feature({ title, description }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

function Pricing() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold">Pricing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <PricingPlan
          title="Basic"
          price="$9.99"
          features={['Customizable proposal templates', 'Client database and management']}
        />
        <PricingPlan
          title="Pro"
          price="$19.99"
          features={[
            'Customizable proposal templates',
            'Client database and management',
            'Proposal analytics and tracking',
          ]}
        />
        <PricingPlan
          title="Enterprise"
          price="$49.99"
          features={[
            'Customizable proposal templates',
            'Client database and management',
            'Proposal analytics and tracking',
            'Integration with popular payment gateways',
            'Collaboration tools for teams',
          ]}
        />
      </div>
    </section>
  );
}

function PricingPlan({ title, price, features }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-3xl font-bold">{price}</p>
      <ul>
        {features.map((feature) => (
          <li key={feature} className="text-gray-600 dark:text-gray-400">
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Faq() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
      <div className="mt-4">
        <Question
          question="What is Proposal Studio?"
          answer="Proposal Studio is a SaaS tool that helps freelancers and creators create, manage, and track proposals with ease."
        />
        <Question
          question="How do I get started with Proposal Studio?"
          answer="To get started with Proposal Studio, simply sign up for an account and start creating your first proposal."
        />
        <Question
          question="What features does Proposal Studio offer?"
          answer="Proposal Studio offers a range of features, including customizable proposal templates, client database and management, proposal analytics and tracking, and more."
        />
      </div>
    </section>
  );
}

function Question({ question, answer }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4">
      <h3 className="text-2xl font-bold">{question}</h3>
      <p className="text-gray-600 dark:text-gray-400">{answer}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="py-12 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <p>
          &copy; {new Date().getFullYear()} Proposal Studio. All rights reserved.
        </p>
        <ul className="flex justify-center mt-4">
          <li className="mr-4">
            <Link href="https://github.com/proposal-studio" target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} />
            </Link>
          </li>
          <li>
            <Link href="https://twitter.com/proposal_studio" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}