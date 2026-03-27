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
      name: 'How does Proposal Studio improve proposal creation, management, and tracking for sales teams and freelancers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio streamlines proposal creation, management, and tracking with a user-friendly interface, customizable proposal templates, and real-time analytics, enabling sales teams and freelancers to create, manage, and track business proposals more efficiently and effectively.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the key benefits of using Proposal Studio for proposal management and sales enablement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The key benefits of using Proposal Studio include increased productivity, improved proposal quality, enhanced client relationships, and increased revenue growth, all of which are driven by our innovative proposal management software, proposal automation, and sales enablement solutions.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Proposal Studio support proposal collaboration and workflow for sales teams and freelancers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio supports proposal collaboration and workflow with features such as real-time commenting, @mentioning, and customizable workflows, enabling sales teams and freelancers to collaborate more effectively and efficiently on business proposals.',
      },
    },
    {
      '@type': 'Question',
      name: 'What kind of proposal analytics and reporting does Proposal Studio offer for sales teams and freelancers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio offers real-time analytics and reporting on proposal performance, including metrics such as open rates, click-through rates, and conversion rates, enabling sales teams and freelancers to optimize their proposal strategy and improve their chances of winning new business.',
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
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
      </Head>
      <div className="container">
        <h1>Proposal Studio FAQ</h1>
        <p>Get answers to frequently asked questions about Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships.</p>
        <div className="faq-section">
          <h2>What is Proposal Studio and how does it help with proposal management and sales enablement?</h2>
          <p>Proposal Studio is a SaaS tool that empowers freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, driving sales enablement, proposal automation, and revenue growth with innovative proposal management software and sales enablement solutions.</p>
        </div>
        <div className="faq-section">
          <h2>How does Proposal Studio improve proposal creation, management, and tracking for sales teams and freelancers?</h2>
          <p>Proposal Studio streamlines proposal creation, management, and tracking with a user-friendly interface, customizable proposal templates, and real-time analytics, enabling sales teams and freelancers to create, manage, and track business proposals more efficiently and effectively.</p>
        </div>
        <div className="faq-section">
          <h2>What are the key benefits of using Proposal Studio for proposal management and sales enablement?</h2>
          <p>The key benefits of using Proposal Studio include increased productivity, improved proposal quality, enhanced client relationships, and increased revenue growth, all of which are driven by our innovative proposal management software, proposal automation, and sales enablement solutions.</p>
        </div>
        <div className="faq-section">
          <h2>How does Proposal Studio support proposal collaboration and workflow for sales teams and freelancers?</h2>
          <p>Proposal Studio supports proposal collaboration and workflow with features such as real-time commenting, @mentioning, and customizable workflows, enabling sales teams and freelancers to collaborate more effectively and efficiently on business proposals.</p>
        </div>
        <div className="faq-section">
          <h2>What kind of proposal analytics and reporting does Proposal Studio offer for sales teams and freelancers?</h2>
          <p>Proposal Studio offers real-time analytics and reporting on proposal performance, including metrics such as open rates, click-through rates, and conversion rates, enabling sales teams and freelancers to optimize their proposal strategy and improve their chances of winning new business.</p>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;