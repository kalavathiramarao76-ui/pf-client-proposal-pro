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
        text: 'Proposal Studio provides a range of features to help with proposal creation, including customizable proposal templates, a drag-and-drop editor, and real-time collaboration tools. Our software is designed to make it easy for businesses to create professional-looking proposals that win.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the benefits of using Proposal Studio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The benefits of using Proposal Studio include increased efficiency, improved collaboration, and enhanced proposal quality. Our software helps businesses to streamline their proposal process, reduce the time spent on proposal creation, and increase their chances of winning new clients.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Proposal Studio secure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Proposal Studio is a secure platform that uses industry-standard encryption and security protocols to protect your data. We take the security of our users seriously and have implemented robust measures to prevent unauthorized access to your proposals and data.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I customize my proposals with Proposal Studio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Proposal Studio allows you to customize your proposals with your own branding, logos, and templates. Our software provides a range of customization options, including the ability to add your own images, videos, and other media to your proposals.',
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
      <h1>FAQ</h1>
      <p>Get answers to frequently asked questions about Proposal Studio.</p>
      <ul>
        <li>
          <Link href="#what-is-proposal-studio">
            <a>What is Proposal Studio?</a>
          </Link>
        </li>
        <li>
          <Link href="#how-does-proposal-studio-help-with-proposal-creation">
            <a>How does Proposal Studio help with proposal creation?</a>
          </Link>
        </li>
        <li>
          <Link href="#what-are-the-benefits-of-using-proposal-studio">
            <a>What are the benefits of using Proposal Studio?</a>
          </Link>
        </li>
        <li>
          <Link href="#is-proposal-studio-secure">
            <a>Is Proposal Studio secure?</a>
          </Link>
        </li>
        <li>
          <Link href="#can-i-customize-my-proposals-with-proposal-studio">
            <a>Can I customize my proposals with Proposal Studio?</a>
          </Link>
        </li>
      </ul>
      <h2 id="what-is-proposal-studio">What is Proposal Studio?</h2>
      <p>Proposal Studio is a SaaS tool that helps freelancers and creators create, manage, and track proposals with ease. Our proposal management software is designed to streamline the proposal process, making it easier for businesses to win new clients and grow their revenue.</p>
      <h2 id="how-does-proposal-studio-help-with-proposal-creation">How does Proposal Studio help with proposal creation?</h2>
      <p>Proposal Studio provides a range of features to help with proposal creation, including customizable proposal templates, a drag-and-drop editor, and real-time collaboration tools. Our software is designed to make it easy for businesses to create professional-looking proposals that win.</p>
      <h2 id="what-are-the-benefits-of-using-proposal-studio">What are the benefits of using Proposal Studio?</h2>
      <p>The benefits of using Proposal Studio include increased efficiency, improved collaboration, and enhanced proposal quality. Our software helps businesses to streamline their proposal process, reduce the time spent on proposal creation, and increase their chances of winning new clients.</p>
      <h2 id="is-proposal-studio-secure">Is Proposal Studio secure?</h2>
      <p>Yes, Proposal Studio is a secure platform that uses industry-standard encryption and security protocols to protect your data. We take the security of our users seriously and have implemented robust measures to prevent unauthorized access to your proposals and data.</p>
      <h2 id="can-i-customize-my-proposals-with-proposal-studio">Can I customize my proposals with Proposal Studio?</h2>
      <p>Yes, Proposal Studio allows you to customize your proposals with your own branding, logos, and templates. Our software provides a range of customization options, including the ability to add your own images, videos, and other media to your proposals.</p>
    </div>
  );
};

export default FaqPage;