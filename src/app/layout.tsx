import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Europe 2026 Planner',
  description: 'Private family trip planner for Europe 2026.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
