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
    image: '/images/proposal-studio-logo.png',
    alt: 'Proposal Studio Logo',
    imageDescription: 'Proposal Studio logo, a SaaS tool for proposal management and creation, designed to help businesses win new clients and grow revenue',
  },
  {
    question: 'What features does Proposal Studio offer?',
    answer: 'Proposal Studio offers a range of features, including customizable proposal templates, a client database, proposal analytics and tracking, integration with popular payment gateways, collaboration tools for teams, and branding and white-labeling options. Our proposal builder and generator tools make it easy to create professional-looking proposals in minutes.',
    metaDescription: 'Explore the robust features of Proposal Studio, including customizable proposal templates, advanced proposal analytics, seamless payment gateway integration, and collaboration tools, all designed to streamline proposal management and drive sales success.',
    metaKeywords: 'Proposal Studio features, proposal templates, proposal analytics, payment gateways, collaboration tools, proposal builder, proposal generator, sales automation, proposal software, sales enablement, revenue growth, business proposals, client relationships',
    image: '/images/proposal-templates.png',
    alt: 'Customizable Proposal Templates',
    imageDescription: 'Customizable proposal templates for freelancers and creators to create professional proposals, tailored to their unique business needs and branding',
  },
  {
    question: 'How do I get started with Proposal Studio?',
    answer: 'To get started with Proposal Studio, simply sign up for an account and explore our features and templates. You can also contact our support team if you have any questions or need assistance. We offer a free trial, so you can try our proposal software before committing to a paid plan.',
    metaDescription: 'Get started with Proposal Studio today and discover how our intuitive proposal management software can help you create, manage, and track business proposals with ease, driving sales success and revenue growth for your business.',
    metaKeywords: 'Proposal Studio, getting started, free trial, proposal software, sign up, support team, sales enablement, proposal automation, business growth, revenue growth, sales teams, proposal management, client relationships',
    image: '/images/get-started.png',
    alt: 'Get Started with Proposal Studio',
    imageDescription: 'Get started with Proposal Studio, a SaaS tool designed to help businesses streamline their proposal process, win new clients, and drive revenue growth',
  },
];

const FaqPage = () => {
  return (
    <div>
      <Head>
        <title>Proposal Studio FAQ</title>
      </Head>
      {faqs.map((faq, index) => (
        <div key={index}>
          <Head>
            <meta name="description" content={faq.metaDescription} />
            <meta name="keywords" content={faq.metaKeywords} />
          </Head>
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