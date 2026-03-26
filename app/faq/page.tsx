import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Image from 'next/image';
import schema from '../schema';

const metaTags = {
  metaDescription: 'Discover Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, empowering sales teams and driving revenue growth.',
  metaKeywords: 'Proposal Studio, SaaS tool, proposal management, freelancers, creators, business proposals, proposal software, proposal templates, client relationships, sales enablement, proposal automation, business growth, revenue growth, sales teams',
  metaTitle: 'Proposal Studio: SaaS Tool for Freelancers and Creators',
  metaCanonical: 'https://www.proposalstudio.com/faq',
  metaRobots: 'index, follow',
  metaOgTitle: 'Proposal Studio: SaaS Tool for Freelancers and Creators',
  metaOgDescription: 'Discover Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, empowering sales teams and driving revenue growth.',
  metaOgUrl: 'https://www.proposalstudio.com/faq',
  metaOgImage: '/images/proposal-studio-logo.png',
  metaOgType: 'website',
  metaTwitterCard: 'summary_large_image',
  metaTwitterSite: '@proposalstudio',
  metaTwitterTitle: 'Proposal Studio: SaaS Tool for Freelancers and Creators',
  metaTwitterDescription: 'Discover Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, empowering sales teams and driving revenue growth.',
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
  ],
};

const faqs = [
  {
    question: 'What is Proposal Studio?',
    answer: 'Proposal Studio is a SaaS tool that helps freelancers and creators create, manage, and track proposals with ease. Our proposal management software is designed to streamline the proposal process, making it easier for businesses to win new clients and grow their revenue.',
    image: '/images/proposal-studio-logo.png',
    alt: 'Proposal Studio Logo',
    imageDescription: 'Proposal Studio logo, a SaaS tool for proposal management and creation, designed to help businesses win new clients and grow revenue',
  },
];

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
      {faqs.map((faq, index) => (
        <div key={index}>
          <h2>{faq.question}</h2>
          <p>{faq.answer}</p>
          <Image src={faq.image} alt={faq.alt} />
          <p>{faq.imageDescription}</p>
        </div>
      ))}
    </div>
  );
};

export default FaqPage;