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
        text: 'Proposal Studio streamlines proposal creation and tracking with its intuitive proposal builder, automated workflows, and real-time analytics, enabling freelancers and creators to focus on high-value tasks and drive business growth.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the benefits of using Proposal Studio for proposal management and sales enablement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio offers numerous benefits, including increased proposal conversion rates, improved sales team productivity, enhanced client relationships, and data-driven insights to inform business decisions and drive revenue growth.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Proposal Studio support collaboration and workflow management?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio facilitates seamless collaboration and workflow management with its customizable proposal templates, automated approval processes, and real-time notifications, ensuring that all stakeholders are aligned and informed throughout the proposal lifecycle.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Proposal Studio integrate with existing sales and marketing tools?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Proposal Studio integrates with a wide range of sales and marketing tools, including CRM systems, marketing automation platforms, and productivity software, enabling freelancers and creators to leverage their existing technology stack and maximize the value of their proposal management and sales enablement efforts.',
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
      <p>Get expert answers to your proposal management questions and learn how Proposal Studio can help you drive sales enablement and revenue growth.</p>
      <h3>What is Proposal Studio and how does it help with proposal management and sales enablement?</h3>
      <p>Proposal Studio is a SaaS tool that empowers freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, driving sales enablement, proposal automation, and revenue growth with innovative proposal management software and sales enablement solutions.</p>
      <h3>How does Proposal Studio improve proposal creation and tracking?</h3>
      <p>Proposal Studio streamlines proposal creation and tracking with its intuitive proposal builder, automated workflows, and real-time analytics, enabling freelancers and creators to focus on high-value tasks and drive business growth.</p>
      <h3>What are the benefits of using Proposal Studio for proposal management and sales enablement?</h3>
      <p>Proposal Studio offers numerous benefits, including increased proposal conversion rates, improved sales team productivity, enhanced client relationships, and data-driven insights to inform business decisions and drive revenue growth.</p>
      <h3>How does Proposal Studio support collaboration and workflow management?</h3>
      <p>Proposal Studio facilitates seamless collaboration and workflow management with its customizable proposal templates, automated approval processes, and real-time notifications, ensuring that all stakeholders are aligned and informed throughout the proposal lifecycle.</p>
      <h3>Can Proposal Studio integrate with existing sales and marketing tools?</h3>
      <p>Yes, Proposal Studio integrates with a wide range of sales and marketing tools, including CRM systems, marketing automation platforms, and productivity software, enabling freelancers and creators to leverage their existing technology stack and maximize the value of their proposal management and sales enablement efforts.</p>
      <Link href="/contact">
        <a>
          <button>
            Contact Us <AiOutlineArrowRight />
          </button>
        </a>
      </Link>
    </div>
  );
};

export default FaqPage;