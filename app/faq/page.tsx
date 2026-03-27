import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Image from 'next/image';
import schema from '../schema';

const metaTags = {
  metaDescription: 'Discover Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, empowering sales teams and driving revenue growth with our innovative proposal management software.',
  metaKeywords: 'Proposal Studio, SaaS tool, proposal management, freelancers, creators, business proposals, proposal software, proposal templates, client relationships, sales enablement, proposal automation, business growth, revenue growth, sales teams, proposal creation, proposal tracking, proposal analytics, proposal writing, proposal design, proposal development, proposal strategy',
  metaTitle: 'Proposal Studio: SaaS Tool for Freelancers and Creators - Proposal Management Made Easy',
  metaCanonical: 'https://www.proposalstudio.com/faq',
  metaRobots: 'index, follow',
  metaOgTitle: 'Proposal Studio: SaaS Tool for Freelancers and Creators - Proposal Management Made Easy',
  metaOgDescription: 'Discover Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, empowering sales teams and driving revenue growth with our innovative proposal management software.',
  metaOgUrl: 'https://www.proposalstudio.com/faq',
  metaOgImage: '/images/proposal-studio-logo.png',
  metaOgType: 'website',
  metaTwitterCard: 'summary_large_image',
  metaTwitterSite: '@proposalstudio',
  metaTwitterTitle: 'Proposal Studio: SaaS Tool for Freelancers and Creators - Proposal Management Made Easy',
  metaTwitterDescription: 'Discover Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, empowering sales teams and driving revenue growth with our innovative proposal management software.',
  metaTwitterImage: '/images/proposal-studio-logo.png',
};

const schemaMarkup = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Proposal Studio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio is a SaaS tool that helps freelancers and creators create, manage, and track proposals with ease. Our proposal management software is designed to streamline the proposal process, making it easier for businesses to win new clients and grow their revenue.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Proposal Studio help with proposal creation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio provides a range of features to help with proposal creation, including customizable proposal templates, a user-friendly interface, and real-time collaboration tools.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the benefits of using Proposal Studio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The benefits of using Proposal Studio include increased efficiency, improved collaboration, and enhanced proposal quality, all of which can lead to increased revenue and business growth.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Proposal Studio suitable for small businesses and freelancers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Proposal Studio is designed to be accessible and affordable for small businesses and freelancers, with a range of pricing plans and features to suit different needs and budgets.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Proposal Studio support sales teams?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio provides sales teams with the tools and insights they need to create effective proposals, track client interactions, and analyze proposal performance, all of which can help drive revenue growth and improve sales outcomes.',
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
        <h1>Frequently Asked Questions</h1>
        <div className="faq-section">
          <h2>General Questions</h2>
          <div className="faq-question">
            <h3>What is Proposal Studio?</h3>
            <p>Proposal Studio is a SaaS tool that helps freelancers and creators create, manage, and track proposals with ease. Our proposal management software is designed to streamline the proposal process, making it easier for businesses to win new clients and grow their revenue.</p>
          </div>
          <div className="faq-question">
            <h3>How does Proposal Studio help with proposal creation?</h3>
            <p>Proposal Studio provides a range of features to help with proposal creation, including customizable proposal templates, a user-friendly interface, and real-time collaboration tools.</p>
          </div>
        </div>
        <div className="faq-section">
          <h2>Benefits and Features</h2>
          <div className="faq-question">
            <h3>What are the benefits of using Proposal Studio?</h3>
            <p>The benefits of using Proposal Studio include increased efficiency, improved collaboration, and enhanced proposal quality, all of which can lead to increased revenue and business growth.</p>
          </div>
          <div className="faq-question">
            <h3>Is Proposal Studio suitable for small businesses and freelancers?</h3>
            <p>Yes, Proposal Studio is designed to be accessible and affordable for small businesses and freelancers, with a range of pricing plans and features to suit different needs and budgets.</p>
          </div>
        </div>
        <div className="faq-section">
          <h2>Sales and Revenue Growth</h2>
          <div className="faq-question">
            <h3>How does Proposal Studio support sales teams?</h3>
            <p>Proposal Studio provides sales teams with the tools and insights they need to create effective proposals, track client interactions, and analyze proposal performance, all of which can help drive revenue growth and improve sales outcomes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;