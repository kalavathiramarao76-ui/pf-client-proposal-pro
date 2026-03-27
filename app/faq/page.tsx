import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Image from 'next/image';
import schema from '../schema';

const metaTags = {
  metaDescription: 'Discover Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, empowering sales teams and driving revenue growth with our innovative proposal management software, proposal automation, and sales enablement solutions.',
  metaKeywords: 'Proposal Studio, SaaS tool, proposal management, freelancers, creators, business proposals, proposal software, proposal templates, client relationships, sales enablement, proposal automation, business growth, revenue growth, sales teams, proposal creation, proposal tracking, proposal analytics, proposal writing, proposal design, proposal development, proposal strategy, proposal optimization, proposal success, proposal management platform, proposal builder, proposal generator, proposal collaboration, proposal workflow, proposal tracking, proposal reporting',
  metaTitle: 'Proposal Studio: SaaS Tool for Freelancers and Creators - Proposal Management Made Easy | Proposal Automation and Sales Enablement',
  metaCanonical: 'https://www.proposalstudio.com/faq',
  metaRobots: 'index, follow',
  metaOgTitle: 'Proposal Studio: SaaS Tool for Freelancers and Creators - Proposal Management Made Easy | Proposal Automation and Sales Enablement',
  metaOgDescription: 'Discover Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, empowering sales teams and driving revenue growth with our innovative proposal management software, proposal automation, and sales enablement solutions.',
  metaOgUrl: 'https://www.proposalstudio.com/faq',
  metaOgImage: '/images/proposal-studio-logo.png',
  metaOgType: 'website',
  metaTwitterCard: 'summary_large_image',
  metaTwitterSite: '@proposalstudio',
  metaTwitterTitle: 'Proposal Studio: SaaS Tool for Freelancers and Creators - Proposal Management Made Easy | Proposal Automation and Sales Enablement',
  metaTwitterDescription: 'Discover Proposal Studio, a cutting-edge SaaS tool for freelancers and creators to create, manage, and track business proposals, proposal templates, and client relationships, empowering sales teams and driving revenue growth with our innovative proposal management software, proposal automation, and sales enablement solutions.',
  metaTwitterImage: '/images/proposal-studio-logo.png',
};

const schemaMarkup = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Proposal Studio and how does it help with proposal management?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio is a SaaS tool that helps freelancers and creators create, manage, and track proposals with ease. Our proposal management software is designed to streamline the proposal creation process, automate tasks, and provide real-time analytics to help you optimize your proposal strategy and increase your chances of winning.',
      },
    },
    {
      '@type': 'Question',
      name: 'What features does Proposal Studio offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio offers a range of features, including proposal templates, proposal builder, proposal collaboration, proposal tracking, proposal reporting, and proposal analytics. Our platform is designed to help you create, manage, and track proposals with ease, and provide you with the insights you need to optimize your proposal strategy and drive revenue growth.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Proposal Studio help with proposal automation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proposal Studio helps with proposal automation by providing a range of tools and features that automate tasks, such as proposal creation, proposal tracking, and proposal reporting. Our platform is designed to help you streamline your proposal workflow, reduce manual errors, and increase efficiency, so you can focus on what matters most - winning new business.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the benefit of using Proposal Studio for sales enablement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The benefit of using Proposal Studio for sales enablement is that it provides sales teams with the tools and insights they need to create, manage, and track proposals with ease. Our platform is designed to help sales teams optimize their proposal strategy, increase their chances of winning, and drive revenue growth. With Proposal Studio, sales teams can access a range of proposal templates, proposal analytics, and proposal tracking features, all in one place.',
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
      <h1>FAQs</h1>
      <p>Discover how Proposal Studio can help you create, manage, and track business proposals with ease.</p>
      <ul>
        <li>
          <h2>What is Proposal Studio and how does it help with proposal management?</h2>
          <p>Proposal Studio is a SaaS tool that helps freelancers and creators create, manage, and track proposals with ease. Our proposal management software is designed to streamline the proposal creation process, automate tasks, and provide real-time analytics to help you optimize your proposal strategy and increase your chances of winning.</p>
        </li>
        <li>
          <h2>What features does Proposal Studio offer?</h2>
          <p>Proposal Studio offers a range of features, including proposal templates, proposal builder, proposal collaboration, proposal tracking, proposal reporting, and proposal analytics. Our platform is designed to help you create, manage, and track proposals with ease, and provide you with the insights you need to optimize your proposal strategy and drive revenue growth.</p>
        </li>
        <li>
          <h2>How does Proposal Studio help with proposal automation?</h2>
          <p>Proposal Studio helps with proposal automation by providing a range of tools and features that automate tasks, such as proposal creation, proposal tracking, and proposal reporting. Our platform is designed to help you streamline your proposal workflow, reduce manual errors, and increase efficiency, so you can focus on what matters most - winning new business.</p>
        </li>
        <li>
          <h2>What is the benefit of using Proposal Studio for sales enablement?</h2>
          <p>The benefit of using Proposal Studio for sales enablement is that it provides sales teams with the tools and insights they need to create, manage, and track proposals with ease. Our platform is designed to help sales teams optimize their proposal strategy, increase their chances of winning, and drive revenue growth. With Proposal Studio, sales teams can access a range of proposal templates, proposal analytics, and proposal tracking features, all in one place.</p>
        </li>
      </ul>
    </div>
  );
};

export default FaqPage;