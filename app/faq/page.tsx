import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Image from 'next/image';

const faqs = [
  {
    question: 'What is Proposal Studio?',
    answer: 'Proposal Studio is a SaaS tool that helps freelancers and creators create, manage, and track proposals with ease. Our proposal management software is designed to streamline the proposal process, making it easier for businesses to win new clients and grow their revenue.',
    metaDescription: 'Learn about Proposal Studio, a SaaS tool for freelancers and creators to create and manage business proposals, proposal templates, and client relationships.',
    metaKeywords: 'Proposal Studio, SaaS tool, proposal management, freelancers, creators, business proposals, proposal software, proposal templates, client relationships, sales enablement, proposal automation',
    image: '/images/proposal-studio-logo.png',
    alt: 'Proposal Studio Logo',
    imageDescription: 'Proposal Studio logo, a SaaS tool for proposal management and creation',
  },
  {
    question: 'What features does Proposal Studio offer?',
    answer: 'Proposal Studio offers a range of features, including customizable proposal templates, a client database, proposal analytics and tracking, integration with popular payment gateways, collaboration tools for teams, and branding and white-labeling options. Our proposal builder and generator tools make it easy to create professional-looking proposals in minutes.',
    metaDescription: 'Discover the features of Proposal Studio, including customizable proposal templates, proposal analytics, and payment gateway integration for streamlined proposal management.',
    metaKeywords: 'Proposal Studio features, proposal templates, proposal analytics, payment gateways, collaboration tools, proposal builder, proposal generator, sales automation, proposal software',
    image: '/images/proposal-templates.png',
    alt: 'Customizable Proposal Templates',
    imageDescription: 'Customizable proposal templates for freelancers and creators to create professional proposals',
  },
  {
    question: 'How do I get started with Proposal Studio?',
    answer: 'To get started with Proposal Studio, simply sign up for an account and explore our features and templates. You can also contact our support team if you have any questions or need assistance. We offer a free trial, so you can try our proposal software before committing to a paid plan.',
    metaDescription: 'Get started with Proposal Studio by signing up for an account and exploring our features, templates, and support resources for a streamlined proposal process.',
    metaKeywords: 'Proposal Studio, getting started, free trial, proposal software, sign up, support team, sales enablement, proposal automation',
    image: '/images/get-started.png',
    alt: 'Get Started with Proposal Studio',
    imageDescription: 'Get started with Proposal Studio, a SaaS tool for proposal management and creation',
  },
  {
    question: 'Is Proposal Studio suitable for my business?',
    answer: 'Proposal Studio is designed for freelancers and creators who want to streamline their proposal process and increase their chances of winning new clients. If you fit this description, then Proposal Studio is likely a good fit for your business. Our proposal management software is scalable, so it can grow with your business, and we offer a range of pricing plans to suit different needs and budgets.',
    metaDescription: 'Determine if Proposal Studio is suitable for your business by learning about our target audience, features, and pricing plans for proposal management and creation.',
    metaKeywords: 'Proposal Studio, business suitability, freelancers, creators, proposal management, proposal software, sales enablement, proposal automation, scalable software',
    image: '/images/suitable-business.png',
    alt: 'Is Proposal Studio suitable for my business?',
    imageDescription: 'Determine if Proposal Studio is suitable for your business, a SaaS tool for proposal management and creation',
  },
];

const FaqPage = () => {
  return (
    <div>
      <Head>
        <title>Proposal Studio FAQ</title>
        <meta name="description" content="Frequently asked questions about Proposal Studio, a SaaS tool for proposal management and creation" />
        <meta name="keywords" content="Proposal Studio, FAQ, proposal management, proposal software, freelancers, creators, business proposals" />
      </Head>
      {faqs.map((faq, index) => (
        <div key={index}>
          <h2>{faq.question}</h2>
          <p>{faq.answer}</p>
          <Image src={faq.image} alt={faq.alt} width={500} height={300} />
          <p>{faq.imageDescription}</p>
          <Head>
            <meta name="description" content={faq.metaDescription} />
            <meta name="keywords" content={faq.metaKeywords} />
          </Head>
        </div>
      ))}
    </div>
  );
};

export default FaqPage;