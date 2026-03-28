import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Image from 'next/image';
import schema from '../schema';

const metaTags = {
  metaDescription: 'Discover the ultimate guide to Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, driving sales enablement, proposal automation, and revenue growth.',
  metaKeywords: 'Proposal Studio, SaaS tool, proposal management, freelancers, creators, business proposals, proposal software, proposal templates, client relationships, sales enablement, proposal automation, business growth, revenue growth, sales teams, proposal creation, proposal tracking, proposal analytics, proposal writing, proposal design, proposal development, proposal strategy, proposal optimization, proposal success, proposal management platform, proposal builder, proposal generator, proposal collaboration, proposal workflow, proposal tracking, proposal reporting, FAQ, frequently asked questions',
  metaTitle: 'Proposal Studio FAQ: Expert Answers to Your Proposal Management Questions',
  metaCanonical: 'https://www.proposalstudio.com/faq',
  metaRobots: 'index, follow',
  metaOgTitle: 'Proposal Studio FAQ: Expert Answers to Your Proposal Management Questions',
  metaOgDescription: 'Get expert answers to frequently asked questions about Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, driving sales enablement and revenue growth.',
  metaOgUrl: 'https://www.proposalstudio.com/faq',
  metaOgImage: '/images/proposal-studio-logo.png',
  metaOgType: 'website',
  metaTwitterCard: 'summary_large_image',
  metaTwitterSite: '@proposalstudio',
  metaTwitterTitle: 'Proposal Studio FAQ: Expert Answers to Your Proposal Management Questions',
  metaTwitterDescription: 'Get expert answers to frequently asked questions about Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, driving sales enablement and revenue growth.',
  metaTwitterImage: '/images/proposal-studio-logo.png',
};

const schemaMarkup = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Proposal Studio and how does it help with proposal management and sales enablement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio is a SaaS tool that empowers freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, driving sales enablement, proposal automation, and revenue growth with innovative proposal management software and sales enablement solutions.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Proposal Studio support proposal automation and revenue growth?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio supports proposal automation and revenue growth by providing a range of features, including proposal templates, automated workflows, and real-time analytics, to help freelancers and creators streamline their proposal process and increase their chances of winning new business.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of proposals can I create with Proposal Studio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'With Proposal Studio, you can create a wide range of proposals, including business proposals, sales proposals, marketing proposals, and more. Our platform provides a range of customizable templates and tools to help you create professional-looking proposals that meet your specific needs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Proposal Studio help with client relationships and sales enablement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio helps with client relationships and sales enablement by providing a range of features, including client management tools, sales analytics, and proposal tracking, to help freelancers and creators build stronger relationships with their clients and close more deals.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Proposal Studio suitable for small businesses and entrepreneurs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Proposal Studio is suitable for small businesses and entrepreneurs. Our platform is designed to be scalable and flexible, making it easy for small businesses and entrepreneurs to create, manage, and track their proposals, regardless of their size or industry.',
      },
    },
  ],
};

const FaqPage = () => {
  return (
    <div>
      <Head>
        <title>{metaTags.metaTitle}</title>
        <meta name="description" content={metaTags.metaDescription} />
        <meta name="keywords" content={metaTags.metaKeywords} />
        <meta name="canonical" content={metaTags.metaCanonical} />
        <meta name="robots" content={metaTags.metaRobots} />
        <meta property="og:title" content={metaTags.metaOgTitle} />
        <meta property="og:description" content={metaTags.metaOgDescription} />
        <meta property="og:url" content={metaTags.metaOgUrl} />
        <meta property="og:image" content={metaTags.metaOgImage} />
        <meta property="og:type" content={metaTags.metaOgType} />
        <meta name="twitter:card" content={metaTags.metaTwitterCard} />
        <meta name="twitter:site" content={metaTags.metaTwitterSite} />
        <meta name="twitter:title" content={metaTags.metaTwitterTitle} />
        <meta name="twitter:description" content={metaTags.metaTwitterDescription} />
        <meta name="twitter:image" content={metaTags.metaTwitterImage} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </Head>
      <div>
        <h1>Proposal Studio FAQ</h1>
        <p>Get expert answers to frequently asked questions about Proposal Studio.</p>
        <ul>
          <li>
            <h2>What is Proposal Studio and how does it help with proposal management and sales enablement?</h2>
            <p>Proposal Studio is a SaaS tool that empowers freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, driving sales enablement, proposal automation, and revenue growth with innovative proposal management software and sales enablement solutions.</p>
          </li>
          <li>
            <h2>How does Proposal Studio support proposal automation and revenue growth?</h2>
            <p>Proposal Studio supports proposal automation and revenue growth by providing a range of features, including proposal templates, automated workflows, and real-time analytics, to help freelancers and creators streamline their proposal process and increase their chances of winning new business.</p>
          </li>
          <li>
            <h2>What types of proposals can I create with Proposal Studio?</h2>
            <p>With Proposal Studio, you can create a wide range of proposals, including business proposals, sales proposals, marketing proposals, and more. Our platform provides a range of customizable templates and tools to help you create professional-looking proposals that meet your specific needs.</p>
          </li>
          <li>
            <h2>How does Proposal Studio help with client relationships and sales enablement?</h2>
            <p>Proposal Studio helps with client relationships and sales enablement by providing a range of features, including client management tools, sales analytics, and proposal tracking, to help freelancers and creators build stronger relationships with their clients and close more deals.</p>
          </li>
          <li>
            <h2>Is Proposal Studio suitable for small businesses and entrepreneurs?</h2>
            <p>Yes, Proposal Studio is suitable for small businesses and entrepreneurs. Our platform is designed to be scalable and flexible, making it easy for small businesses and entrepreneurs to create, manage, and track their proposals, regardless of their size or industry.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FaqPage;