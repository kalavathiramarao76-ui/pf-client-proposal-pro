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
        text: 'Proposal Studio provides a range of features to help with proposal creation, including customizable proposal templates, a user-friendly interface, and real-time collaboration tools. Our software is designed to make it easy for businesses to create professional-looking proposals that win.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the benefits of using Proposal Studio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The benefits of using Proposal Studio include increased efficiency, improved collaboration, and enhanced proposal quality. Our software helps businesses to streamline their proposal process, reduce errors, and increase their chances of winning new clients.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Proposal Studio easy to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Proposal Studio is designed to be user-friendly and easy to use. Our software is intuitive and requires minimal training, making it easy for businesses to get started and start creating proposals right away.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I customize my proposals with Proposal Studio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Proposal Studio allows you to customize your proposals with your own branding, logos, and content. Our software provides a range of customizable proposal templates and a user-friendly interface that makes it easy to create professional-looking proposals that reflect your business.',
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
      <h1>FAQ</h1>
      <p>Here are some frequently asked questions about Proposal Studio:</p>
      <ul>
        <li>
          <h2>What is Proposal Studio?</h2>
          <p>Proposal Studio is a SaaS tool that helps freelancers and creators create, manage, and track proposals with ease. Our proposal management software is designed to streamline the proposal process, making it easier for businesses to win new clients and grow their revenue.</p>
        </li>
        <li>
          <h2>How does Proposal Studio help with proposal creation?</h2>
          <p>Proposal Studio provides a range of features to help with proposal creation, including customizable proposal templates, a user-friendly interface, and real-time collaboration tools. Our software is designed to make it easy for businesses to create professional-looking proposals that win.</p>
        </li>
        <li>
          <h2>What are the benefits of using Proposal Studio?</h2>
          <p>The benefits of using Proposal Studio include increased efficiency, improved collaboration, and enhanced proposal quality. Our software helps businesses to streamline their proposal process, reduce errors, and increase their chances of winning new clients.</p>
        </li>
        <li>
          <h2>Is Proposal Studio easy to use?</h2>
          <p>Yes, Proposal Studio is designed to be user-friendly and easy to use. Our software is intuitive and requires minimal training, making it easy for businesses to get started and start creating proposals right away.</p>
        </li>
        <li>
          <h2>Can I customize my proposals with Proposal Studio?</h2>
          <p>Yes, Proposal Studio allows you to customize your proposals with your own branding, logos, and content. Our software provides a range of customizable proposal templates and a user-friendly interface that makes it easy to create professional-looking proposals that reflect your business.</p>
        </li>
      </ul>
    </div>
  );
};

export default FaqPage;