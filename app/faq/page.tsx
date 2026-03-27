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
        text: 'Proposal Studio provides a range of features to help with proposal creation, including customizable proposal templates, a library of pre-built content, and a user-friendly editor that makes it easy to create and customize proposals.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the benefits of using Proposal Studio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The benefits of using Proposal Studio include increased efficiency, improved proposal quality, and enhanced collaboration. Our software helps businesses to streamline their proposal process, reduce the time and effort required to create proposals, and improve their chances of winning new clients.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Proposal Studio suitable for small businesses and freelancers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Proposal Studio is suitable for small businesses and freelancers. Our software is designed to be user-friendly and accessible, and we offer a range of pricing plans to suit different business needs and budgets.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I customize the proposal templates in Proposal Studio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, you can customize the proposal templates in Proposal Studio. Our software allows you to add your own branding, images, and content to the templates, and you can also create your own custom templates from scratch.',
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
          <h2>What is Proposal Studio?</h2>
          <p>Proposal Studio is a SaaS tool that helps freelancers and creators create, manage, and track proposals with ease. Our proposal management software is designed to streamline the proposal process, making it easier for businesses to win new clients and grow their revenue.</p>
        </div>
        <div className="faq-section">
          <h2>How does Proposal Studio help with proposal creation?</h2>
          <p>Proposal Studio provides a range of features to help with proposal creation, including customizable proposal templates, a library of pre-built content, and a user-friendly editor that makes it easy to create and customize proposals.</p>
        </div>
        <div className="faq-section">
          <h2>What are the benefits of using Proposal Studio?</h2>
          <p>The benefits of using Proposal Studio include increased efficiency, improved proposal quality, and enhanced collaboration. Our software helps businesses to streamline their proposal process, reduce the time and effort required to create proposals, and improve their chances of winning new clients.</p>
        </div>
        <div className="faq-section">
          <h2>Is Proposal Studio suitable for small businesses and freelancers?</h2>
          <p>Yes, Proposal Studio is suitable for small businesses and freelancers. Our software is designed to be user-friendly and accessible, and we offer a range of pricing plans to suit different business needs and budgets.</p>
        </div>
        <div className="faq-section">
          <h2>Can I customize the proposal templates in Proposal Studio?</h2>
          <p>Yes, you can customize the proposal templates in Proposal Studio. Our software allows you to add your own branding, images, and content to the templates, and you can also create your own custom templates from scratch.</p>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;