import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Global Neurodiversity Association (GNA)',
  description: 'The world\'s leading professional association for ADHD and neurodiversity specialists. Membership, certification, specialist registry, and more.',
};

import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
