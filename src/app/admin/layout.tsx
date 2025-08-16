import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'DPBoss Admin Panel',
  description: 'Professional Admin Dashboard for DPBoss',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-white antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="relative">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
