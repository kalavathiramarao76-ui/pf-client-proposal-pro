import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Image from 'next/image';
import schema from '../schema';

const metaTags = {
  metaDescription: 'Get answers to frequently asked questions about Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships.',
  metaKeywords: 'Proposal Studio, SaaS tool, proposal management, freelancers, creators, business proposals, proposal software, proposal templates, client relationships, sales enablement, proposal automation, business growth, revenue growth, sales teams, proposal creation, proposal tracking, proposal analytics, proposal writing, proposal design, proposal development, proposal strategy, proposal optimization, proposal success, proposal management platform, proposal builder, proposal generator, proposal collaboration, proposal workflow, proposal tracking, proposal reporting, FAQ, frequently asked questions',
  metaTitle: 'Proposal Studio FAQ: Answers to Your Proposal Management Questions',
  metaCanonical: 'https://www.proposalstudio.com/faq',
  metaRobots: 'index, follow',
  metaOgTitle: 'Proposal Studio FAQ: Answers to Your Proposal Management Questions',
  metaOgDescription: 'Get answers to frequently asked questions about Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships.',
  metaOgUrl: 'https://www.proposalstudio.com/faq',
  metaOgImage: '/images/proposal-studio-logo.png',
  metaOgType: 'website',
  metaTwitterCard: 'summary_large_image',
  metaTwitterSite: '@proposalstudio',
  metaTwitterTitle: 'Proposal Studio FAQ: Answers to Your Proposal Management Questions',
  metaTwitterDescription: 'Get answers to frequently asked questions about Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships.',
  metaTwitterImage: '/images/proposal-studio-logo.png',
};

const schemaMarkup = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Proposal Studio and how does it help with proposal management?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio is a SaaS tool that helps freelancers and creators create, manage, and track business proposals, proposal templates, and client relationships, empowering sales teams and driving revenue growth with innovative proposal management software, proposal automation, and sales enablement solutions.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Proposal Studio improve proposal creation and management?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio streamlines proposal creation and management by providing a centralized platform for creating, editing, and tracking proposals, as well as automating tasks and providing real-time analytics and insights.',
      },
    },
    {
      '@type': 'Question',
      name: 'What features does Proposal Studio offer for sales teams and revenue growth?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio offers a range of features for sales teams and revenue growth, including proposal automation, sales enablement, and real-time analytics and insights, to help drive revenue growth and improve sales performance.',
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
      <h2>Frequently Asked Questions</h2>
      <p>Get answers to your questions about Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships.</p>
      <h3>What is Proposal Studio and how does it help with proposal management?</h3>
      <p>Proposal Studio is a SaaS tool that helps freelancers and creators create, manage, and track business proposals, proposal templates, and client relationships, empowering sales teams and driving revenue growth with innovative proposal management software, proposal automation, and sales enablement solutions.</p>
      <h3>How does Proposal Studio improve proposal creation and management?</h3>
      <p>Proposal Studio streamlines proposal creation and management by providing a centralized platform for creating, editing, and tracking proposals, as well as automating tasks and providing real-time analytics and insights.</p>
      <h3>What features does Proposal Studio offer for sales teams and revenue growth?</h3>
      <p>Proposal Studio offers a range of features for sales teams and revenue growth, including proposal automation, sales enablement, and real-time analytics and insights, to help drive revenue growth and improve sales performance.</p>
      <Link href="/">
        <a>
          <AiOutlineArrowRight />
          Back to Home
        </a>
      </Link>
    </div>
  );
};

export default FaqPage;