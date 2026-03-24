import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Image from 'next/image';

const faqs = [
  {
    question: 'What is Proposal Studio?',
    answer: 'Proposal Studio is a SaaS tool that helps freelancers and creators create, manage, and track proposals with ease. Our proposal management software is designed to streamline the proposal process, making it easier for businesses to win new clients and grow their revenue.',
  },
  {
    question: 'What features does Proposal Studio offer?',
    answer: 'Proposal Studio offers a range of features, including customizable proposal templates, a client database, proposal analytics and tracking, integration with popular payment gateways, collaboration tools for teams, and branding and white-labeling options. Our proposal builder and generator tools make it easy to create professional-looking proposals in minutes.',
  },
  {
    question: 'How do I get started with Proposal Studio?',
    answer: 'To get started with Proposal Studio, simply sign up for an account and explore our features and templates. You can also contact our support team if you have any questions or need assistance. We offer a free trial, so you can try our proposal software before committing to a paid plan.',
  },
  {
    question: 'Is Proposal Studio suitable for my business?',
    answer: 'Proposal Studio is designed for freelancers and creators who want to streamline their proposal process and increase their chances of winning new clients. If you fit this description, then Proposal Studio is likely a good fit for your business. Our proposal management software is scalable, so it can grow with your business, and we offer a range of pricing plans to suit different needs and budgets.',
  },
  {
    question: 'How much does Proposal Studio cost?',
    answer: 'Please visit our pricing page to learn more about our pricing plans and to find the one that best suits your needs. We offer a range of plans, including a free trial, so you can try our proposal software before committing to a paid plan.',
  },
];

const FAQPage = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleToggle = (index: number) => {
    if (expanded === faqs[index].question) {
      setExpanded(null);
    } else {
      setExpanded(faqs[index].question);
    }
  };

  return (
    <div>
      <Head>
        <title>Proposal Studio FAQ - Frequently Asked Questions</title>
        <meta name="description" content="Get answers to frequently asked questions about Proposal Studio, a SaaS tool for freelancers and creators to create, manage, and track proposals. Learn about our proposal management software, features, pricing, and more." />
        <meta name="keywords" content="Proposal Studio, FAQ, SaaS tool, freelancers, creators, proposal management, proposal tracking, business proposals, proposal software, proposal templates, pricing plans, free trial, proposal builder, proposal generator, client database, proposal analytics, payment gateways, collaboration tools, branding, white-labeling" />
        <meta property="og:title" content="Proposal Studio FAQ - Frequently Asked Questions" />
        <meta property="og:description" content="Get answers to frequently asked questions about Proposal Studio, a SaaS tool for freelancers and creators to create, manage, and track proposals. Learn about our proposal management software, features, pricing, and more." />
        <meta property="og:url" content="https://www.proposalstudio.com/faq" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Proposal Studio FAQ - Frequently Asked Questions" />
        <meta name="twitter:description" content="Get answers to frequently asked questions about Proposal Studio, a SaaS tool for freelancers and creators to create, manage, and track proposals. Learn about our proposal management software, features, pricing, and more." />
        <meta name="twitter:url" content="https://www.proposalstudio.com/faq" />
      </Head>
      {faqs.map((faq, index) => (
        <div key={index}>
          <button onClick={() => handleToggle(index)} className="faq-question">
            <span>{faq.question}</span>
            <AiOutlineArrowRight className={expanded === faq.question ? 'arrow-down' : 'arrow-right'} />
          </button>
          {expanded === faq.question && (
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQPage;