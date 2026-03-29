import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Image from 'next/image';
import schema from '../schema';

const metaTags = {
  metaDescription: 'Discover the ultimate guide to Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, driving sales enablement, proposal automation, and revenue growth. Learn about proposal management, sales enablement, business growth, and revenue growth with our expert answers to frequently asked questions.',
  metaKeywords: 'Proposal Studio, SaaS tool, proposal management, freelancers, creators, business proposals, proposal software, proposal templates, client relationships, sales enablement, proposal automation, business growth, revenue growth, sales teams, proposal creation, proposal tracking, proposal analytics, proposal writing, proposal design, proposal development, proposal strategy, proposal optimization, proposal success, proposal management platform, proposal builder, proposal generator, proposal collaboration, proposal workflow, proposal tracking, proposal reporting, FAQ, frequently asked questions, proposal management software, proposal creation tool, proposal template builder',
  metaTitle: 'Proposal Studio FAQ: Expert Answers to Your Proposal Management and Sales Enablement Questions',
  metaCanonical: 'https://www.proposalstudio.com/faq',
  metaRobots: 'index, follow',
  metaOgTitle: 'Proposal Studio FAQ: Expert Answers to Your Proposal Management and Sales Enablement Questions',
  metaOgDescription: 'Get expert answers to frequently asked questions about Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, driving sales enablement and revenue growth. Learn about proposal management, sales enablement, and business growth with our expert answers.',
  metaOgUrl: 'https://www.proposalstudio.com/faq',
  metaOgImage: '/images/proposal-studio-logo.png',
  metaOgType: 'website',
  metaTwitterCard: 'summary_large_image',
  metaTwitterSite: '@proposalstudio',
  metaTwitterTitle: 'Proposal Studio FAQ: Expert Answers to Your Proposal Management and Sales Enablement Questions',
  metaTwitterDescription: 'Get expert answers to frequently asked questions about Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, driving sales enablement and revenue growth. Learn about proposal management, sales enablement, and business growth with our expert answers.',
  metaTwitterImage: '/images/proposal-studio-logo.png',
  metaAuthor: 'Proposal Studio Team',
  metaCopyright: '2024 Proposal Studio. All rights reserved.',
  metaPublisher: 'Proposal Studio',
  metaRevised: '2024-01-01',
  metaStructuredData: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Proposal Studio?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Proposal Studio is a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, driving sales enablement and revenue growth.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does Proposal Studio work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Proposal Studio provides a comprehensive platform for creating, managing, and tracking business proposals, including proposal templates, client relationships, and sales enablement tools.',
        },
      },
    ],
  },
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
        <meta name="author" content={metaTags.metaAuthor} />
        <meta name="copyright" content={metaTags.metaCopyright} />
        <meta name="publisher" content={metaTags.metaPublisher} />
        <meta name="revised" content={metaTags.metaRevised} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(metaTags.metaStructuredData),
          }}
        />
      </Head>
      {/* Rest of the page content */}
    </div>
  );
};

export default FaqPage;