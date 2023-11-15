import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { ThemeProvider } from '@/components/theme-provider';
import ClientProviders from '@/components/ClientProviders';
import FirebaseAuthProvider from '@/components/FirebaseAuthProvider';
import SubscriptionProvider from '@/components/SubscriptionProvider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SpeakEase',
  description: 'Connect seamlessly with people worldwide in your native language. SpeakEase uses advanced translation technology for real-time language exchange.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProviders>
      <html lang="en">
        <body>
          <main className="flex flex-col min-h-screen">
            <FirebaseAuthProvider>
              <SubscriptionProvider>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
                >
                  <Header />
                  {children}
                  <Toaster />

                </ThemeProvider>
              </SubscriptionProvider>
            </FirebaseAuthProvider>
          </main>
        </body>
      </html>
    </ClientProviders>
  );
}
