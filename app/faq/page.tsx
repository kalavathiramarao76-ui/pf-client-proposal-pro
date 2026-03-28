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
  metaAuthor: 'Proposal Studio Team',
  metaCopyright: '2024 Proposal Studio. All rights reserved.',
  metaPublisher: 'Proposal Studio',
  metaRevised: '2024-01-01',
  metaCategory: 'Business, Technology, SaaS',
  metaTags: 'proposal management, sales enablement, business growth, revenue growth',
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
        text: 'Proposal Studio is a SaaS tool that empowers freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, driving sales enablement and revenue growth.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Proposal Studio enhance proposal automation and workflow?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio streamlines proposal creation, tracking, and analytics, enabling users to focus on high-value tasks and driving business growth.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the benefits of using Proposal Studio for proposal management and sales enablement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio offers a range of benefits, including improved proposal creation, enhanced collaboration, and data-driven insights, ultimately driving revenue growth and business success.',
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
        <meta name="author" content={metaTags.metaAuthor} />
        <meta name="copyright" content={metaTags.metaCopyright} />
        <meta name="publisher" content={metaTags.metaPublisher} />
        <meta name="revised" content={metaTags.metaRevised} />
        <meta name="category" content={metaTags.metaCategory} />
        <meta name="tags" content={metaTags.metaTags} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
      </Head>
      <div>
        <h1>Proposal Studio FAQ</h1>
        <p>Get expert answers to frequently asked questions about Proposal Studio.</p>
        <ul>
          <li>
            <Link href="#what-is-proposal-studio">
              <a>What is Proposal Studio and how does it help with proposal management and sales enablement?</a>
            </Link>
          </li>
          <li>
            <Link href="#how-does-proposal-studio-enhance-proposal-automation-and-workflow">
              <a>How does Proposal Studio enhance proposal automation and workflow?</a>
            </Link>
          </li>
          <li>
            <Link href="#what-are-the-benefits-of-using-proposal-studio-for-proposal-management-and-sales-enablement">
              <a>What are the benefits of using Proposal Studio for proposal management and sales enablement?</a>
            </Link>
          </li>
        </ul>
        <h2 id="what-is-proposal-studio">What is Proposal Studio and how does it help with proposal management and sales enablement?</h2>
        <p>Proposal Studio is a SaaS tool that empowers freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, driving sales enablement and revenue growth.</p>
        <h2 id="how-does-proposal-studio-enhance-proposal-automation-and-workflow">How does Proposal Studio enhance proposal automation and workflow?</h2>
        <p>Proposal Studio streamlines proposal creation, tracking, and analytics, enabling users to focus on high-value tasks and driving business growth.</p>
        <h2 id="what-are-the-benefits-of-using-proposal-studio-for-proposal-management-and-sales-enablement">What are the benefits of using Proposal Studio for proposal management and sales enablement?</h2>
        <p>Proposal Studio offers a range of benefits, including improved proposal creation, enhanced collaboration, and data-driven insights, ultimately driving revenue growth and business success.</p>
      </div>
    </div>
  );
};

export default FaqPage;