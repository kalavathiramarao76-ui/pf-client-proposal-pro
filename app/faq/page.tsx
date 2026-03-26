import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Image from 'next/image';
import schema from '../schema';

const metaTags = {
  metaDescription: 'Discover Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, empowering sales teams and driving revenue growth with our innovative proposal management software.',
  metaKeywords: 'Proposal Studio, SaaS tool, proposal management, freelancers, creators, business proposals, proposal software, proposal templates, client relationships, sales enablement, proposal automation, business growth, revenue growth, sales teams, proposal creation, proposal tracking, proposal analytics',
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
        text: 'Proposal Studio provides a range of features to help with proposal creation, including customizable proposal templates, a proposal builder, and a library of pre-built content. Our software is designed to make it easy to create professional-looking proposals that win new business.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the benefits of using Proposal Studio for proposal management?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The benefits of using Proposal Studio for proposal management include increased efficiency, improved collaboration, and enhanced visibility into the proposal process. Our software helps businesses to streamline their proposal process, reduce errors, and improve their chances of winning new business.',
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
  {
    question: 'How does Proposal Studio help with proposal creation?',
    answer: 'Proposal Studio provides a range of features to help with proposal creation, including customizable proposal templates, a proposal builder, and a library of pre-built content. Our software is designed to make it easy to create professional-looking proposals that win new business.',
    image: '/images/proposal-creation.png',
    alt: 'Proposal Creation',
    imageDescription: 'Proposal creation, a key feature of Proposal Studio, designed to help businesses create professional-looking proposals that win new business',
  },
  {
    question: 'What are the benefits of using Proposal Studio for proposal management?',
    answer: 'The benefits of using Proposal Studio for proposal management include increased efficiency, improved collaboration, and enhanced visibility into the proposal process. Our software helps businesses to streamline their proposal process, reduce errors, and improve their chances of winning new business.',
    image: '/images/proposal-management.png',
    alt: 'Proposal Management',
    imageDescription: 'Proposal management, a key feature of Proposal Studio, designed to help businesses streamline their proposal process and improve their chances of winning new business',
  },
];

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
      {faqs.map((faq, index) => (
        <div key={index}>
          <h2>{faq.question}</h2>
          <p>{faq.answer}</p>
          <Image src={faq.image} alt={faq.alt} width={200} height={200} />
          <p>{faq.imageDescription}</p>
        </div>
      ))}
    </div>
  );
};

export default FaqPage;