import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { AiOutlineArrowRight } from 'react-icons/ai';

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
        <meta name="keywords" content="Proposal Studio, FAQ, SaaS tool, freelancers, creators, proposal management, proposal tracking, business proposals, proposal software, proposal templates, proposal writing, proposal design, proposal creation, business proposal templates, proposal builder, proposal generator, proposal maker" />
        <meta property="og:title" content="Proposal Studio FAQ - Frequently Asked Questions" />
        <meta property="og:description" content="Get answers to frequently asked questions about Proposal Studio, a SaaS tool for freelancers and creators to create, manage, and track proposals." />
        <meta property="og:url" content="https://www.proposalstudio.com/faq" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Proposal Studio FAQ - Frequently Asked Questions" />
        <meta name="twitter:description" content="Get answers to frequently asked questions about Proposal Studio, a SaaS tool for freelancers and creators to create, manage, and track proposals." />
        <meta name="twitter:url" content="https://www.proposalstudio.com/faq" />
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="1 days" />
        <meta name="author" content="Proposal Studio" />
        <meta name="copyright" content="2024 Proposal Studio" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {faqs.map((faq, index) => (
        <div key={index}>
          <div>
            <h3>{faq.question}</h3>
            <button onClick={() => handleToggle(index)}>
              <AiOutlineArrowRight />
            </button>
          </div>
          {expanded === faq.question && (
            <p>{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQPage;