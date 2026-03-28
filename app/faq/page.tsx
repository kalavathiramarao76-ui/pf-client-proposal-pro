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
      name: 'How does Proposal Studio improve proposal creation and tracking?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio streamlines proposal creation and tracking with features like proposal templates, automated workflows, and real-time analytics, enabling users to create, manage, and track proposals efficiently and effectively.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the benefits of using Proposal Studio for sales enablement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio provides sales teams with the tools and insights they need to close more deals, including personalized proposal templates, automated proposal tracking, and data-driven analytics to optimize their sales strategy.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Proposal Studio be integrated with other sales and marketing tools?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Proposal Studio can be integrated with a variety of sales and marketing tools, including CRM systems, marketing automation platforms, and sales enablement software, to provide a seamless and connected sales experience.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Proposal Studio support collaboration and workflow management?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio enables teams to collaborate on proposals in real-time, with features like simultaneous editing, automated version control, and customizable workflows, to streamline the proposal creation and review process.',
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
      <div className="container">
        <h1>Proposal Studio FAQ</h1>
        <p>Get expert answers to frequently asked questions about Proposal Studio.</p>
        <div className="faq-section">
          <h2>What is Proposal Studio and how does it help with proposal management and sales enablement?</h2>
          <p>Proposal Studio is a SaaS tool that empowers freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, driving sales enablement, proposal automation, and revenue growth with innovative proposal management software and sales enablement solutions.</p>
        </div>
        <div className="faq-section">
          <h2>How does Proposal Studio improve proposal creation and tracking?</h2>
          <p>Proposal Studio streamlines proposal creation and tracking with features like proposal templates, automated workflows, and real-time analytics, enabling users to create, manage, and track proposals efficiently and effectively.</p>
        </div>
        <div className="faq-section">
          <h2>What are the benefits of using Proposal Studio for sales enablement?</h2>
          <p>Proposal Studio provides sales teams with the tools and insights they need to close more deals, including personalized proposal templates, automated proposal tracking, and data-driven analytics to optimize their sales strategy.</p>
        </div>
        <div className="faq-section">
          <h2>Can Proposal Studio be integrated with other sales and marketing tools?</h2>
          <p>Yes, Proposal Studio can be integrated with a variety of sales and marketing tools, including CRM systems, marketing automation platforms, and sales enablement software, to provide a seamless and connected sales experience.</p>
        </div>
        <div className="faq-section">
          <h2>How does Proposal Studio support collaboration and workflow management?</h2>
          <p>Proposal Studio enables teams to collaborate on proposals in real-time, with features like simultaneous editing, automated version control, and customizable workflows, to streamline the proposal creation and review process.</p>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;