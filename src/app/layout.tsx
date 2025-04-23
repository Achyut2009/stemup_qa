import type { Metadata } from 'next';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StemUp | Empowering Through Education',
  description: 'StemUp is dedicated to advancing STEM education and creating opportunities for the next generation of innovators.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-cyan-800 to-teal-600 flex flex-col">
          <div className="flex-grow">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
