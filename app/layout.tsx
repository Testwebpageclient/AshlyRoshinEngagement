import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ashly & Roshin — Ultra-Luxury Digital Engagement Invitation',
  description: 'You are cordially invited to celebrate the Engagement Ceremony & Reception of Ashly & Roshin on August 15, 2026.',
  openGraph: {
    title: 'Ashly & Roshin — Engagement Invitation',
    description: 'An ultra-luxury digital engagement invitation experience for Ashly & Roshin.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Pinyon+Script&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-[#FDF6ED] text-[#778873] antialiased selection:bg-[#A1BC98] selection:text-[#FDF6ED]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
