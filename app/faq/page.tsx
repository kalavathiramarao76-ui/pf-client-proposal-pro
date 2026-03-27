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
      name: 'How does Proposal Studio improve proposal creation and tracking?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio provides a range of features to improve proposal creation and tracking, including customizable proposal templates, automated proposal workflows, and real-time proposal analytics, enabling users to streamline their proposal process and increase their chances of success.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the benefits of using Proposal Studio for sales enablement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio provides a range of benefits for sales enablement, including access to a library of customizable proposal templates, automated proposal workflows, and real-time proposal analytics, enabling sales teams to create and manage proposals more efficiently and effectively, and driving revenue growth through improved proposal success rates.',
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
      <h2>Introduction to Proposal Studio</h2>
      <p>Proposal Studio is a cutting-edge SaaS tool designed to help freelancers and creators create, manage, and track business proposals, proposal templates, and client relationships.</p>
      <h2>Benefits of Using Proposal Studio</h2>
      <p>Proposal Studio provides a range of benefits, including improved proposal creation and tracking, automated proposal workflows, and real-time proposal analytics, enabling users to streamline their proposal process and increase their chances of success.</p>
      <h2>Proposal Studio Features</h2>
      <ul>
        <li>Customizable proposal templates</li>
        <li>Automated proposal workflows</li>
        <li>Real-time proposal analytics</li>
        <li>Collaboration tools for teams</li>
        <li>Integration with popular CRM and sales tools</li>
      </ul>
      <h2>Getting Started with Proposal Studio</h2>
      <p>To get started with Proposal Studio, simply sign up for a free trial and begin exploring the platform. Our intuitive interface and comprehensive guides make it easy to get started and start creating and managing proposals in no time.</p>
      <Link href="/contact">
        <a>
          Contact Us <AiOutlineArrowRight />
        </a>
      </Link>
    </div>
  );
};

export default FaqPage;