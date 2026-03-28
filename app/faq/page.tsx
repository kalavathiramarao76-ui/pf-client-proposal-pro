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
      name: 'What is the benefit of using Proposal Studio for proposal tracking?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio provides real-time tracking and analytics, enabling users to monitor the status of their proposals and make data-driven decisions to improve their sales strategy.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Proposal Studio support sales enablement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio provides a range of sales enablement tools, including proposal templates, sales content management, and analytics. These tools enable sales teams to create and manage effective sales content, and to track the performance of their sales efforts.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Proposal Studio be used for collaboration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Proposal Studio provides features to support collaboration, including real-time commenting, @mentions, and version control. These features enable teams to work together on proposals and sales content, and to track changes and feedback.',
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
        <link rel="canonical" href={metaTags.metaCanonical} />
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
      <p>Get expert answers to frequently asked questions about Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, driving sales enablement and revenue growth.</p>
      <ul>
        <li>
          <Link href="#what-is-proposal-studio">
            <a>What is Proposal Studio and how does it help with proposal management and sales enablement?</a>
          </Link>
        </li>
        <li>
          <Link href="#how-does-proposal-studio-help-with-proposal-creation">
            <a>How does Proposal Studio help with proposal creation?</a>
          </Link>
        </li>
        <li>
          <Link href="#what-is-the-benefit-of-using-proposal-studio-for-proposal-tracking">
            <a>What is the benefit of using Proposal Studio for proposal tracking?</a>
          </Link>
        </li>
        <li>
          <Link href="#how-does-proposal-studio-support-sales-enablement">
            <a>How does Proposal Studio support sales enablement?</a>
          </Link>
        </li>
        <li>
          <Link href="#can-proposal-studio-be-used-for-collaboration">
            <a>Can Proposal Studio be used for collaboration?</a>
          </Link>
        </li>
      </ul>
      <h2 id="what-is-proposal-studio">What is Proposal Studio and how does it help with proposal management and sales enablement?</h2>
      <p>Proposal Studio is a SaaS tool that empowers freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, driving sales enablement, proposal automation, and revenue growth with innovative proposal management software and sales enablement solutions.</p>
      <h2 id="how-does-proposal-studio-help-with-proposal-creation">How does Proposal Studio help with proposal creation?</h2>
      <p>Proposal Studio provides a range of features to help with proposal creation, including proposal templates, a proposal builder, and a proposal generator. These tools enable users to create professional-looking proposals quickly and easily.</p>
      <h2 id="what-is-the-benefit-of-using-proposal-studio-for-proposal-tracking">What is the benefit of using Proposal Studio for proposal tracking?</h2>
      <p>Proposal Studio provides real-time tracking and analytics, enabling users to monitor the status of their proposals and make data-driven decisions to improve their sales strategy.</p>
      <h2 id="how-does-proposal-studio-support-sales-enablement">How does Proposal Studio support sales enablement?</h2>
      <p>Proposal Studio provides a range of sales enablement tools, including proposal templates, sales content management, and analytics. These tools enable sales teams to create and manage effective sales content, and to track the performance of their sales efforts.</p>
      <h2 id="can-proposal-studio-be-used-for-collaboration">Can Proposal Studio be used for collaboration?</h2>
      <p>Yes, Proposal Studio provides features to support collaboration, including real-time commenting, @mentions, and version control. These features enable teams to work together on proposals and sales content, and to track changes and feedback.</p>
    </div>
  );
};

export default FaqPage;