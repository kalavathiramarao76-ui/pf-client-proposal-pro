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
        text: 'Proposal Studio streamlines proposal creation and tracking by providing a centralized platform for managing proposals, templates, and client relationships, enabling users to create, send, and track proposals efficiently and effectively.',
      },
    },
    {
      '@type': 'Question',
      name: 'What features does Proposal Studio offer for sales enablement and revenue growth?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio offers a range of features for sales enablement and revenue growth, including proposal automation, sales analytics, and client relationship management, helping users to close more deals and drive business growth.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Proposal Studio suitable for freelancers and small businesses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Proposal Studio is designed to support freelancers and small businesses, providing an affordable and scalable solution for managing proposals, clients, and sales enablement, helping them to compete with larger businesses and drive growth.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Proposal Studio ensure data security and compliance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio prioritizes data security and compliance, using industry-standard encryption, secure servers, and regular backups to protect user data, and complying with relevant regulations and standards, such as GDPR and HIPAA.',
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
      <h1>Proposal Studio FAQ</h1>
      <h2>Frequently Asked Questions</h2>
      <p>Get expert answers to your Proposal Studio questions and learn how to get the most out of our proposal management and sales enablement platform.</p>
      <h3>What is Proposal Studio and how does it help with proposal management and sales enablement?</h3>
      <p>Proposal Studio is a SaaS tool that empowers freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, driving sales enablement, proposal automation, and revenue growth with innovative proposal management software and sales enablement solutions.</p>
      <h3>How does Proposal Studio improve proposal creation and tracking?</h3>
      <p>Proposal Studio streamlines proposal creation and tracking by providing a centralized platform for managing proposals, templates, and client relationships, enabling users to create, send, and track proposals efficiently and effectively.</p>
      <h3>What features does Proposal Studio offer for sales enablement and revenue growth?</h3>
      <p>Proposal Studio offers a range of features for sales enablement and revenue growth, including proposal automation, sales analytics, and client relationship management, helping users to close more deals and drive business growth.</p>
      <h3>Is Proposal Studio suitable for freelancers and small businesses?</h3>
      <p>Yes, Proposal Studio is designed to support freelancers and small businesses, providing an affordable and scalable solution for managing proposals, clients, and sales enablement, helping them to compete with larger businesses and drive growth.</p>
      <h3>How does Proposal Studio ensure data security and compliance?</h3>
      <p>Proposal Studio prioritizes data security and compliance, using industry-standard encryption, secure servers, and regular backups to protect user data, and complying with relevant regulations and standards, such as GDPR and HIPAA.</p>
    </div>
  );
};

export default FaqPage;