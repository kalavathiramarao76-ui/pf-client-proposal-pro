import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Image from 'next/image';

const faqs = [
  {
    question: 'What is Proposal Studio?',
    answer: 'Proposal Studio is a SaaS tool that helps freelancers and creators create, manage, and track proposals with ease. Our proposal management software is designed to streamline the proposal process, making it easier for businesses to win new clients and grow their revenue.',
  },
  {
    question: 'What features does Proposal Studio offer?',
    answer: 'Proposal Studio offers a range of features, including customizable proposal templates, a client database, proposal analytics and tracking, integration with popular payment gateways, collaboration tools for teams, and branding and white-labeling options. Our proposal builder and generator tools make it easy to create professional-looking proposals in minutes.',
  },
  {
    question: 'How do I get started with Proposal Studio?',
    answer: 'To get started with Proposal Studio, simply sign up for an account and explore our features and templates. You can also contact our support team if you have any questions or need assistance. We offer a free trial, so you can try our proposal software before committing to a paid plan.',
  },
  {
    question: 'Is Proposal Studio suitable for my business?',
    answer: 'Proposal Studio is designed for freelancers and creators who want to streamline their proposal process and increase their chances of winning new clients. If you fit this description, then Proposal Studio is likely a good fit for your business. Our proposal management software is scalable, so it can grow with your business, and we offer a range of pricing plans to suit different needs and budgets.',
  },
  {
    question: 'How much does Proposal Studio cost?',
    answer: 'Please visit our <Link href="/pricing">pricing page</Link> to learn more about our pricing plans and to find the one that best suits your needs. We offer a range of plans, including a free trial, so you can try our proposal software before committing to a paid plan.',
  },
];

const FAQPage = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleToggle = (index: number) => {
    if (expanded === faqs[index].question) {
      setExpanded(null);
    } else {
      setExpanded(faqs[index].question);
    }
  };

  return (
    <div>
      <Head>
        <title>Proposal Studio FAQ - Frequently Asked Questions</title>
        <meta name="description" content="Get answers to frequently asked questions about Proposal Studio, a SaaS tool for freelancers and creators to create, manage, and track proposals. Learn about our proposal management software, features, pricing, and more." />
        <meta name="keywords" content="Proposal Studio, FAQ, SaaS tool, freelancers, creators, proposal management, proposal tracking, business proposals, proposal software, proposal templates" />
        <meta property="og:title" content="Proposal Studio FAQ" />
        <meta property="og:description" content="Get answers to frequently asked questions about Proposal Studio, a SaaS tool for freelancers and creators to create, manage, and track proposals." />
        <meta property="og:url" content="https://www.proposalstudio.com/faq" />
        <meta property="og:site_name" content="Proposal Studio" />
      </Head>
      <h1>Proposal Studio FAQ</h1>
      <p>Get answers to frequently asked questions about Proposal Studio, a SaaS tool for freelancers and creators to create, manage, and track proposals.</p>
      {faqs.map((faq, index) => (
        <div key={index}>
          <h2>{faq.question}</h2>
          <p>{expanded === faq.question ? faq.answer : faq.answer.substring(0, 150) + '...'}</p>
          {expanded !== faq.question && (
            <button onClick={() => handleToggle(index)}>Read more <AiOutlineArrowRight /></button>
          )}
          {expanded === faq.question && (
            <button onClick={() => handleToggle(index)}>Read less <AiOutlineArrowRight /></button>
          )}
        </div>
      ))}
      <h2>Related Pages</h2>
      <ul>
        <li><Link href="/features">Features</Link></li>
        <li><Link href="/pricing">Pricing</Link></li>
        <li><Link href="/about">About Us</Link></li>
      </ul>
    </div>
  );
};

export default FAQPage;