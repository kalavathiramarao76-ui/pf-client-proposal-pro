import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Image from 'next/image';
import schema from '../schema';

const metaTags = {
  metaDescription: 'Discover Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, empowering sales teams and driving revenue growth with our innovative proposal management software, proposal automation, and sales enablement solutions.',
  metaKeywords: 'Proposal Studio, SaaS tool, proposal management, freelancers, creators, business proposals, proposal software, proposal templates, client relationships, sales enablement, proposal automation, business growth, revenue growth, sales teams, proposal creation, proposal tracking, proposal analytics, proposal writing, proposal design, proposal development, proposal strategy, proposal optimization, proposal success',
  metaTitle: 'Proposal Studio: SaaS Tool for Freelancers and Creators - Proposal Management Made Easy | Proposal Automation and Sales Enablement',
  metaCanonical: 'https://www.proposalstudio.com/faq',
  metaRobots: 'index, follow',
  metaOgTitle: 'Proposal Studio: SaaS Tool for Freelancers and Creators - Proposal Management Made Easy | Proposal Automation and Sales Enablement',
  metaOgDescription: 'Discover Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, empowering sales teams and driving revenue growth with our innovative proposal management software, proposal automation, and sales enablement solutions.',
  metaOgUrl: 'https://www.proposalstudio.com/faq',
  metaOgImage: '/images/proposal-studio-logo.png',
  metaOgType: 'website',
  metaTwitterCard: 'summary_large_image',
  metaTwitterSite: '@proposalstudio',
  metaTwitterTitle: 'Proposal Studio: SaaS Tool for Freelancers and Creators - Proposal Management Made Easy | Proposal Automation and Sales Enablement',
  metaTwitterDescription: 'Discover Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, empowering sales teams and driving revenue growth with our innovative proposal management software, proposal automation, and sales enablement solutions.',
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
        text: 'Proposal Studio is a SaaS tool that helps freelancers and creators create, manage, and track proposals with ease. Our proposal management software is designed to streamline the proposal process, making it easier for businesses to win new clients and grow their revenue. With features like proposal automation, sales enablement, and proposal optimization, Proposal Studio empowers sales teams to succeed.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Proposal Studio help with proposal creation and proposal writing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio provides a range of features to help with proposal creation, including customizable proposal templates, proposal design tools, and proposal writing guides. Our proposal software also includes features like proposal tracking, proposal analytics, and proposal success metrics to help businesses optimize their proposal process and improve their chances of winning new clients.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the benefits of using Proposal Studio for proposal management and sales enablement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The benefits of using Proposal Studio include increased efficiency and productivity, improved proposal quality and consistency, enhanced sales enablement and proposal automation, and better proposal tracking and analytics. Our proposal management software also helps businesses to drive revenue growth, improve client relationships, and stay ahead of the competition.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Proposal Studio support sales teams and drive revenue growth?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio supports sales teams by providing them with the tools and resources they need to create, manage, and track proposals effectively. Our proposal management software includes features like proposal automation, sales enablement, and proposal optimization, which help sales teams to work more efficiently and effectively, and to drive revenue growth for their businesses.',
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
      <h1>FAQ</h1>
      <p>Discover Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, empowering sales teams and driving revenue growth with our innovative proposal management software, proposal automation, and sales enablement solutions.</p>
      <h2>What is Proposal Studio and how does it help with proposal management?</h2>
      <p>Proposal Studio is a SaaS tool that helps freelancers and creators create, manage, and track proposals with ease. Our proposal management software is designed to streamline the proposal process, making it easier for businesses to win new clients and grow their revenue. With features like proposal automation, sales enablement, and proposal optimization, Proposal Studio empowers sales teams to succeed.</p>
      <h2>How does Proposal Studio help with proposal creation and proposal writing?</h2>
      <p>Proposal Studio provides a range of features to help with proposal creation, including customizable proposal templates, proposal design tools, and proposal writing guides. Our proposal software also includes features like proposal tracking, proposal analytics, and proposal success metrics to help businesses optimize their proposal process and improve their chances of winning new clients.</p>
      <h2>What are the benefits of using Proposal Studio for proposal management and sales enablement?</h2>
      <p>The benefits of using Proposal Studio include increased efficiency and productivity, improved proposal quality and consistency, enhanced sales enablement and proposal automation, and better proposal tracking and analytics. Our proposal management software also helps businesses to drive revenue growth, improve client relationships, and stay ahead of the competition.</p>
      <h2>How does Proposal Studio support sales teams and drive revenue growth?</h2>
      <p>Proposal Studio supports sales teams by providing them with the tools and resources they need to create, manage, and track proposals effectively. Our proposal management software includes features like proposal automation, sales enablement, and proposal optimization, which help sales teams to work more efficiently and effectively, and to drive revenue growth for their businesses.</p>
    </div>
  );
};

export default FaqPage;