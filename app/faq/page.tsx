import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Image from 'next/image';
import schema from '../schema';

const faqs = [
  {
    question: 'What is Proposal Studio?',
    answer: 'Proposal Studio is a SaaS tool that helps freelancers and creators create, manage, and track proposals with ease. Our proposal management software is designed to streamline the proposal process, making it easier for businesses to win new clients and grow their revenue.',
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
    image: '/images/proposal-studio-logo.png',
    alt: 'Proposal Studio Logo',
    imageDescription: 'Proposal Studio logo, a SaaS tool for proposal management and creation, designed to help businesses win new clients and grow revenue',
    structuredData: {
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
    },
  },
];

const FaqPage = () => {
  return (
    <>
      <Head>
        <title>{faqs[0].metaTitle}</title>
        <meta name="description" content={faqs[0].metaDescription} />
        <meta name="keywords" content={faqs[0].metaKeywords} />
        <link rel="canonical" href={faqs[0].metaCanonical} />
        <meta name="robots" content={faqs[0].metaRobots} />
        <meta property="og:title" content={faqs[0].metaOgTitle} />
        <meta property="og:description" content={faqs[0].metaOgDescription} />
        <meta property="og:url" content={faqs[0].metaOgUrl} />
        <meta property="og:image" content={faqs[0].metaOgImage} />
        <meta property="og:type" content={faqs[0].metaOgType} />
        <meta name="twitter:card" content={faqs[0].metaTwitterCard} />
        <meta name="twitter:site" content={faqs[0].metaTwitterSite} />
        <meta name="twitter:title" content={faqs[0].metaTwitterTitle} />
        <meta name="twitter:description" content={faqs[0].metaTwitterDescription} />
        <meta name="twitter:image" content={faqs[0].metaTwitterImage} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqs[0].structuredData),
          }}
        />
      </Head>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
        <div className="flex flex-col">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <h2 className="text-2xl font-bold mb-2">{faq.question}</h2>
              <p className="text-lg">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FaqPage;