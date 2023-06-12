import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/navibar';
import { Fragment } from 'react';
import { ContextAuthProvider } from '../context/AuthContext';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showNavbar = router.pathname !== '/admin' && router.pathname !== '/admin/sermons' && router.pathname !== '/admin/components/streamCard' && router.pathname !== '/admin/text';

  return (
    <>
      <Fragment>
        <ContextAuthProvider>
          <Head>
            <meta
              name="description"
              content="Mennoniten - Gemeinde designed by David Dyck"
            />
            <link rel="icon" href="/favicon.ico" />
            <link rel="manifest" href="/manifest.json" />
          </Head>
          <Script src="/service-worker.js" strategy="afterInteractive" />

          {showNavbar && <Navbar />}
          <Component {...pageProps} />
        </ContextAuthProvider>
      </Fragment>
    </>
  );
}
