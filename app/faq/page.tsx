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
        text: 'Proposal Studio provides a range of features to help with proposal creation, including customizable proposal templates, a library of pre-built content, and a user-friendly editor. Our software also includes tools for tracking and analyzing proposal performance, allowing businesses to refine their approach and improve their chances of winning new clients.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the benefits of using Proposal Studio for proposal management?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The benefits of using Proposal Studio for proposal management include increased efficiency, improved collaboration, and enhanced visibility into proposal performance. Our software also helps businesses to standardize their proposal process, reduce errors, and improve their overall win rate.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Proposal Studio support sales teams and revenue growth?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio supports sales teams and revenue growth by providing a range of tools and features designed to streamline the proposal process and improve proposal quality. Our software includes features such as customizable proposal templates, automated workflows, and real-time analytics, all of which are designed to help businesses win new clients and grow their revenue.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Proposal Studio suitable for freelancers and small businesses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Proposal Studio is suitable for freelancers and small businesses. Our software is designed to be scalable and flexible, making it easy for businesses of all sizes to create, manage, and track proposals. We also offer a range of pricing plans to suit different business needs and budgets.',
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
      <div>
        <h3>What is Proposal Studio?</h3>
        <p>Proposal Studio is a SaaS tool that helps freelancers and creators create, manage, and track proposals with ease. Our proposal management software is designed to streamline the proposal process, making it easier for businesses to win new clients and grow their revenue.</p>
      </div>
      <div>
        <h3>How does Proposal Studio help with proposal creation?</h3>
        <p>Proposal Studio provides a range of features to help with proposal creation, including customizable proposal templates, a library of pre-built content, and a user-friendly editor. Our software also includes tools for tracking and analyzing proposal performance, allowing businesses to refine their approach and improve their chances of winning new clients.</p>
      </div>
      <div>
        <h3>What are the benefits of using Proposal Studio for proposal management?</h3>
        <p>The benefits of using Proposal Studio for proposal management include increased efficiency, improved collaboration, and enhanced visibility into proposal performance. Our software also helps businesses to standardize their proposal process, reduce errors, and improve their overall win rate.</p>
      </div>
      <div>
        <h3>How does Proposal Studio support sales teams and revenue growth?</h3>
        <p>Proposal Studio supports sales teams and revenue growth by providing a range of tools and features designed to streamline the proposal process and improve proposal quality. Our software includes features such as customizable proposal templates, automated workflows, and real-time analytics, all of which are designed to help businesses win new clients and grow their revenue.</p>
      </div>
      <div>
        <h3>Is Proposal Studio suitable for freelancers and small businesses?</h3>
        <p>Yes, Proposal Studio is suitable for freelancers and small businesses. Our software is designed to be scalable and flexible, making it easy for businesses of all sizes to create, manage, and track proposals. We also offer a range of pricing plans to suit different business needs and budgets.</p>
      </div>
    </div>
  );
};

export default FaqPage;