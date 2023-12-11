import { Nunito_Sans } from 'next/font/google';
import { ThemeProvider } from './providers';
import { IframeResizer } from './iframe';
import './globals.css';

const nunitoSans = Nunito_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'PERSCOM Widget',
  description: 'Generated by create next app'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <IframeResizer />
      <body
        className={nunitoSans.className}
        style={{
          margin: '0.2rem'
        }}
      >
        <ThemeProvider>
          <div className="text-gray-500 dark:text-gray-400">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
