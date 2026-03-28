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
      name: 'How does Proposal Studio help with proposal creation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio provides a range of features to help with proposal creation, including proposal templates, a proposal builder, and a proposal generator. These tools enable users to create professional-looking proposals quickly and easily.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the purpose of the proposal tracking feature in Proposal Studio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The proposal tracking feature in Proposal Studio allows users to track the status of their proposals in real-time, including when a proposal is viewed, accepted, or rejected. This feature helps users stay on top of their proposals and follow up with clients as needed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Proposal Studio for collaboration with my team?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Proposal Studio is designed to facilitate collaboration with your team. You can invite team members to join your account, assign tasks, and track progress. This feature helps ensure that everyone is on the same page and working towards the same goals.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Proposal Studio help with sales enablement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio provides a range of features to help with sales enablement, including proposal analytics, proposal reporting, and sales enablement solutions. These tools enable users to gain insights into their proposal performance, identify areas for improvement, and optimize their sales strategy.',
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
      </Head>
      <div className="container">
        <h1>Proposal Studio FAQ</h1>
        <p>Get expert answers to frequently asked questions about Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, driving sales enablement and revenue growth.</p>
        <div className="faq-section">
          <h2>What is Proposal Studio and how does it help with proposal management and sales enablement?</h2>
          <p>Proposal Studio is a SaaS tool that empowers freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, driving sales enablement, proposal automation, and revenue growth with innovative proposal management software and sales enablement solutions.</p>
        </div>
        <div className="faq-section">
          <h2>How does Proposal Studio help with proposal creation?</h2>
          <p>Proposal Studio provides a range of features to help with proposal creation, including proposal templates, a proposal builder, and a proposal generator. These tools enable users to create professional-looking proposals quickly and easily.</p>
        </div>
        <div className="faq-section">
          <h2>What is the purpose of the proposal tracking feature in Proposal Studio?</h2>
          <p>The proposal tracking feature in Proposal Studio allows users to track the status of their proposals in real-time, including when a proposal is viewed, accepted, or rejected. This feature helps users stay on top of their proposals and follow up with clients as needed.</p>
        </div>
        <div className="faq-section">
          <h2>Can I use Proposal Studio for collaboration with my team?</h2>
          <p>Yes, Proposal Studio is designed to facilitate collaboration with your team. You can invite team members to join your account, assign tasks, and track progress. This feature helps ensure that everyone is on the same page and working towards the same goals.</p>
        </div>
        <div className="faq-section">
          <h2>How does Proposal Studio help with sales enablement?</h2>
          <p>Proposal Studio provides a range of features to help with sales enablement, including proposal analytics, proposal reporting, and sales enablement solutions. These tools enable users to gain insights into their proposal performance, identify areas for improvement, and optimize their sales strategy.</p>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;