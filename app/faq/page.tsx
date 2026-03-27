import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Image from 'next/image';
import schema from '../schema';

const metaTags = {
  metaDescription: 'Discover Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, empowering sales teams and driving revenue growth with our innovative proposal management software, proposal automation, and sales enablement solutions.',
  metaKeywords: 'Proposal Studio, SaaS tool, proposal management, freelancers, creators, business proposals, proposal software, proposal templates, client relationships, sales enablement, proposal automation, business growth, revenue growth, sales teams, proposal creation, proposal tracking, proposal analytics, proposal writing, proposal design, proposal development, proposal strategy, proposal optimization, proposal success, proposal management platform, proposal builder, proposal generator, proposal collaboration, proposal workflow, proposal tracking, proposal reporting',
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
        text: 'Proposal Studio is a SaaS tool that helps freelancers and creators create, manage, and track business proposals, proposal templates, and client relationships, empowering sales teams and driving revenue growth with our innovative proposal management software, proposal automation, and sales enablement solutions.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Proposal Studio improve proposal management?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio improves proposal management by providing a centralized platform for creating, managing, and tracking proposals, as well as automating tasks and providing real-time analytics and insights.',
      },
    },
    {
      '@type': 'Question',
      name: 'What features does Proposal Studio offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio offers a range of features, including proposal creation and management, proposal automation, sales enablement, and real-time analytics and insights.',
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
        <h1>Frequently Asked Questions</h1>
        <div className="faq-section">
          <div className="faq-question">
            <h2>What is Proposal Studio and how does it help with proposal management?</h2>
            <p>
              Proposal Studio is a SaaS tool that helps freelancers and creators create, manage, and track business proposals, proposal templates, and client relationships, empowering sales teams and driving revenue growth with our innovative proposal management software, proposal automation, and sales enablement solutions.
            </p>
          </div>
          <div className="faq-question">
            <h2>How does Proposal Studio improve proposal management?</h2>
            <p>
              Proposal Studio improves proposal management by providing a centralized platform for creating, managing, and tracking proposals, as well as automating tasks and providing real-time analytics and insights.
            </p>
          </div>
          <div className="faq-question">
            <h2>What features does Proposal Studio offer?</h2>
            <p>
              Proposal Studio offers a range of features, including proposal creation and management, proposal automation, sales enablement, and real-time analytics and insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;