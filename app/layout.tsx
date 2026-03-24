use client;

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <html lang="en" className={theme}>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Proposal Studio</title>
        <meta name="description" content="Streamline your proposal process with Proposal Studio. Create, manage, and track proposals with ease." />
        <meta name="keywords" content="freelance proposal template, client proposal software, proposal management tool, freelance business management, client onboarding process" />
        <meta property="og:title" content="Proposal Studio" />
        <meta property="og:description" content="Streamline your proposal process with Proposal Studio. Create, manage, and track proposals with ease." />
        <meta property="og:url" content="https://proposal-studio.com" />
        <meta property="og:image" content="https://proposal-studio.com/og-image.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="font-sans text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900">
        <header className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-900 shadow-sm">
          <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
            <Link href="/" className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Proposal Studio
            </Link>
            <ul className="flex items-center space-x-4">
              <li>
                <Link href="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/proposal-templates" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                  Proposal Templates
                </Link>
              </li>
              <li>
                <Link href="/client-database" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                  Client Database
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="/settings" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                  Settings
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                  Pricing
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto px-4 py-12 md:py-20 lg:py-24 xl:py-28">
          {children}
        </main>
        <footer className="bg-gray-100 dark:bg-gray-900 py-12 md:py-20 lg:py-24 xl:py-28">
          <div className="container mx-auto px-4 text-gray-600 dark:text-gray-400 text-center">
            &copy; 2024 Proposal Studio. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}