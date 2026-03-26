import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Image from 'next/image';

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
  },
  {
    question: 'What features does Proposal Studio offer?',
    answer: 'Proposal Studio offers a range of features, including customizable proposal templates, a client database, proposal analytics and tracking, integration with popular payment gateways, collaboration tools for teams, and branding and white-labeling options. Our proposal builder and generator tools make it easy to create professional-looking proposals in minutes.',
    metaDescription: 'Explore the robust features of Proposal Studio, including customizable proposal templates, advanced proposal analytics, seamless payment gateway integration, and collaboration tools, all designed to streamline proposal management and drive sales success.',
    metaKeywords: 'Proposal Studio features, proposal templates, proposal analytics, payment gateways, collaboration tools, proposal builder, proposal generator, sales automation, proposal software, sales enablement, revenue growth, business proposals, client relationships',
    metaTitle: 'Proposal Studio Features: Streamline Proposal Management',
    metaCanonical: 'https://www.proposalstudio.com/faq',
    metaRobots: 'index, follow',
    metaOgTitle: 'Proposal Studio Features: Streamline Proposal Management',
    metaOgDescription: 'Explore the robust features of Proposal Studio, including customizable proposal templates, advanced proposal analytics, seamless payment gateway integration, and collaboration tools, all designed to streamline proposal management and drive sales success.',
    metaOgUrl: 'https://www.proposalstudio.com/faq',
    metaOgImage: '/images/proposal-templates.png',
    metaOgType: 'website',
    metaTwitterCard: 'summary_large_image',
    metaTwitterSite: '@proposalstudio',
    metaTwitterTitle: 'Proposal Studio Features: Streamline Proposal Management',
    metaTwitterDescription: 'Explore the robust features of Proposal Studio, including customizable proposal templates, advanced proposal analytics, seamless payment gateway integration, and collaboration tools, all designed to streamline proposal management and drive sales success.',
    metaTwitterImage: '/images/proposal-templates.png',
    image: '/images/proposal-templates.png',
    alt: 'Customizable Proposal Templates',
    imageDescription: 'Customizable proposal templates for freelancers and creators to create professional proposals, tailored to their unique business needs and branding',
  },
  {
    question: 'How do I get started with Proposal Studio?',
    answer: 'To get started with Proposal Studio, simply sign up for an account and explore our features and templates. You can also contact our support team if you have any questions or need assistance. We offer a free trial, so you can try our proposal software before committing to a paid plan.',
    metaDescription: 'Get started with Proposal Studio today and discover how our intuitive proposal management software can help you create, manage, and track business proposals with ease.',
    metaKeywords: 'Proposal Studio, get started, sign up, free trial, proposal software, proposal management, business proposals, sales teams, revenue growth',
    metaTitle: 'Get Started with Proposal Studio: Create, Manage, and Track Proposals',
    metaCanonical: 'https://www.proposalstudio.com/faq',
    metaRobots: 'index, follow',
    metaOgTitle: 'Get Started with Proposal Studio: Create, Manage, and Track Proposals',
    metaOgDescription: 'Get started with Proposal Studio today and discover how our intuitive proposal management software can help you create, manage, and track business proposals with ease.',
    metaOgUrl: 'https://www.proposalstudio.com/faq',
    metaOgImage: '/images/proposal-studio-logo.png',
    metaOgType: 'website',
    metaTwitterCard: 'summary_large_image',
    metaTwitterSite: '@proposalstudio',
    metaTwitterTitle: 'Get Started with Proposal Studio: Create, Manage, and Track Proposals',
    metaTwitterDescription: 'Get started with Proposal Studio today and discover how our intuitive proposal management software can help you create, manage, and track business proposals with ease.',
    metaTwitterImage: '/images/proposal-studio-logo.png',
    image: '/images/proposal-studio-logo.png',
    alt: 'Proposal Studio Logo',
    imageDescription: 'Proposal Studio logo, a SaaS tool for proposal management and creation, designed to help businesses win new clients and grow revenue',
  },
];

function FaqPage() {
  return (
    <div>
      <Head>
        <title>Proposal Studio FAQ</title>
        <meta name="description" content="Frequently asked questions about Proposal Studio, a SaaS tool for freelancers and creators to create, manage, and track business proposals." />
        <meta name="keywords" content="Proposal Studio, FAQ, SaaS tool, proposal management, freelancers, creators, business proposals" />
        <meta property="og:title" content="Proposal Studio FAQ" />
        <meta property="og:description" content="Frequently asked questions about Proposal Studio, a SaaS tool for freelancers and creators to create, manage, and track business proposals." />
        <meta property="og:url" content="https://www.proposalstudio.com/faq" />
        <meta property="og:image" content="/images/proposal-studio-logo.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@proposalstudio" />
        <meta name="twitter:title" content="Proposal Studio FAQ" />
        <meta name="twitter:description" content="Frequently asked questions about Proposal Studio, a SaaS tool for freelancers and creators to create, manage, and track business proposals." />
        <meta name="twitter:image" content="/images/proposal-studio-logo.png" />
      </Head>
      {faqs.map((faq, index) => (
        <div key={index}>
          <h2>{faq.question}</h2>
          <p>{faq.answer}</p>
          <Image src={faq.image} alt={faq.alt} width={100} height={100} />
          <p>{faq.imageDescription}</p>
          <Head>
            <meta property="og:title" content={faq.metaTitle} />
            <meta property="og:description" content={faq.metaDescription} />
            <meta property="og:url" content={faq.metaOgUrl} />
            <meta property="og:image" content={faq.metaOgImage} />
            <meta name="twitter:card" content={faq.metaTwitterCard} />
            <meta name="twitter:site" content={faq.metaTwitterSite} />
            <meta name="twitter:title" content={faq.metaTwitterTitle} />
            <meta name="twitter:description" content={faq.metaTwitterDescription} />
            <meta name="twitter:image" content={faq.metaTwitterImage} />
          </Head>
        </div>
      ))}
    </div>
  );
}

export default FaqPage;