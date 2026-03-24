import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Image from 'next/image';

const faqs = [
  {
    question: 'What is Proposal Studio?',
    answer: 'Proposal Studio is a SaaS tool that helps freelancers and creators create, manage, and track proposals with ease.',
  },
  {
    question: 'What features does Proposal Studio offer?',
    answer: 'Proposal Studio offers customizable proposal templates, a client database, proposal analytics and tracking, integration with popular payment gateways, collaboration tools for teams, and branding and white-labeling options.',
  },
  {
    question: 'How do I get started with Proposal Studio?',
    answer: 'To get started with Proposal Studio, simply sign up for an account and explore our features and templates. You can also contact our support team if you have any questions or need assistance.',
  },
  {
    question: 'Is Proposal Studio suitable for my business?',
    answer: 'Proposal Studio is designed for freelancers and creators who want to streamline their proposal process and increase their chances of winning new clients. If you fit this description, then Proposal Studio is likely a good fit for your business.',
  },
  {
    question: 'How much does Proposal Studio cost?',
    answer: 'Please visit our pricing page to learn more about our pricing plans and to find the one that best suits your needs.',
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
        <meta name="description" content="Get answers to frequently asked questions about Proposal Studio, a SaaS tool for freelancers and creators to create, manage, and track proposals." />
        <meta name="keywords" content="Proposal Studio, FAQ, SaaS tool, freelancers, creators, proposal management, proposal tracking, business proposals, proposal software, proposal templates, proposal writing, proposal design, proposal creation, business proposal templates, proposal builder, proposal generator, proposal maker, proposal studio pricing, proposal studio features, proposal studio reviews, proposal studio demo, proposal studio tutorial, proposal studio login, proposal studio sign up, proposal studio free trial" />
        <meta property="og:title" content="Proposal Studio FAQ - Frequently Asked Questions" />
        <meta property="og:description" content="Get answers to frequently asked questions about Proposal Studio, a SaaS tool for freelancers and creators to create, manage, and track proposals." />
        <meta property="og:url" content="https://www.proposalstudio.com/faq" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Proposal Studio FAQ - Frequently Asked Questions" />
        <meta name="twitter:description" content="Get answers to frequently asked questions about Proposal Studio, a SaaS tool for freelancers and creators to create, manage, and track proposals." />
        <meta name="twitter:url" content="https://www.proposalstudio.com/faq" />
        <link rel="canonical" href="https://www.proposalstudio.com/faq" />
      </Head>
      <h1>Proposal Studio FAQ</h1>
      <p>Frequently asked questions about Proposal Studio, a SaaS tool for freelancers and creators to create, manage, and track proposals.</p>
      <ul>
        {faqs.map((faq, index) => (
          <li key={index}>
            <button onClick={() => handleToggle(index)}>
              {faq.question}
              <AiOutlineArrowRight />
            </button>
            {expanded === faq.question && (
              <p>{faq.answer}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQPage;