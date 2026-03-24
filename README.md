# Proposal Studio

Proposal Studio is a SaaS tool that helps freelancers and creators create, manage, and track proposals with ease. It offers a range of customizable templates, a client database, and analytics to optimize proposal performance. With Proposal Studio, users can streamline their proposal process and increase their chances of winning new clients.

## Features

* Customizable proposal templates
* Client database and management
* Proposal analytics and tracking
* Integration with popular payment gateways
* Collaboration tools for teams
* Branding and white-labeling options

## Pages

* Dashboard
* Proposal templates
* Client database
* Analytics
* Settings
* Pricing

## SEO Keywords

* freelance proposal template
* client proposal software
* proposal management tool
* freelance business management
* client onboarding process

## Getting Started

To get started with Proposal Studio, clone the repository and install the dependencies:

```bash
npm install
```

Then, start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Technologies Used

* Next.js 14 App Router
* TypeScript
* Tailwind CSS
* Premium UI (Linear/Notion aesthetic)
* Mobile-first responsive design

## Package.json

```json
{
  "name": "proposal-studio",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.4.0"
  }
}
```

## Next.config.mjs

```javascript
module.exports = {
  experimental: {
    appDir: true,
  },
};
```

## Layout.tsx

```typescript
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Proposal Studio</title>
        <meta name="description" content="Proposal Studio is a SaaS tool that helps freelancers and creators create, manage, and track proposals with ease." />
        <meta name="keywords" content="freelance proposal template, client proposal software, proposal management tool, freelance business management, client onboarding process" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="dark:bg-gray-900">
        {children}
      </body>
    </html>
  );
}
```

## Landing Page

```typescript
import type { ReactNode } from 'react';

interface LandingPageProps {
  children: ReactNode;
}

export default function LandingPage({ children }: LandingPageProps) {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="hero bg-gradient-to-r from-blue-500 to-purple-500 p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white">Proposal Studio</h1>
        <p className="text-lg text-white">Create, manage, and track proposals with ease.</p>
      </div>
      <div className="feature-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-10">
        <div className="feature bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Customizable Proposal Templates</h2>
          <p className="text-lg">Create professional-looking proposals with our customizable templates.</p>
        </div>
        <div className="feature bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Client Database and Management</h2>
          <p className="text-lg">Manage your clients and their proposals in one place.</p>
        </div>
        <div className="feature bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Proposal Analytics and Tracking</h2>
          <p className="text-lg">Track the performance of your proposals and optimize your strategy.</p>
        </div>
      </div>
      <div className="pricing-table w-full p-10">
        <h2 className="text-lg font-bold">Pricing</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-200 p-2">Plan</th>
              <th className="border border-gray-200 p-2">Price</th>
              <th className="border border-gray-200 p-2">Features</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 p-2">Basic</td>
              <td className="border border-gray-200 p-2">$9.99/month</td>
              <td className="border border-gray-200 p-2">Customizable proposal templates, client database and management</td>
            </tr>
            <tr>
              <td className="border border-gray-200 p-2">Premium</td>
              <td className="border border-gray-200 p-2">$19.99/month</td>
              <td className="border border-gray-200 p-2">Customizable proposal templates, client database and management, proposal analytics and tracking</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="faq w-full p-10">
        <h2 className="text-lg font-bold">Frequently Asked Questions</h2>
        <ul>
          <li>
            <h3 className="text-lg font-bold">What is Proposal Studio?</h3>
            <p className="text-lg">Proposal Studio is a SaaS tool that helps freelancers and creators create, manage, and track proposals with ease.</p>
          </li>
          <li>
            <h3 className="text-lg font-bold">How do I get started with Proposal Studio?</h3>
            <p className="text-lg">To get started with Proposal Studio, simply sign up for an account and start creating your proposals.</p>
          </li>
        </ul>
      </div>
      <div className="footer w-full p-10 bg-gray-200 text-gray-600">
        <p>&copy; 2024 Proposal Studio. All rights reserved.</p>
      </div>
    </div>
  );
}