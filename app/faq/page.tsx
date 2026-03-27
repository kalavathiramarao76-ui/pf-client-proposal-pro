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
        text: 'Proposal Studio streamlines proposal creation and management by providing a user-friendly interface, customizable templates, and automated workflows, enabling users to focus on high-value tasks and improve their overall proposal success rate.',
      },
    },
    {
      '@type': 'Question',
      name: 'What features does Proposal Studio offer to support proposal management?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio offers a range of features, including proposal templates, proposal tracking, proposal analytics, and collaboration tools, to support proposal management and help users achieve their business goals.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Proposal Studio enhance sales enablement and revenue growth?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio enhances sales enablement and revenue growth by providing users with data-driven insights, automated workflows, and personalized proposal templates, enabling them to create and manage high-quality proposals that drive business results.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Proposal Studio be integrated with other business tools and systems?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Proposal Studio can be integrated with a range of business tools and systems, including CRM software, marketing automation platforms, and productivity suites, to provide a seamless and connected user experience.',
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
        <p>Get answers to frequently asked questions about Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships.</p>
        <Link href="/contact">
          <a>
            <button>
              Contact Us <AiOutlineArrowRight />
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default FaqPage;