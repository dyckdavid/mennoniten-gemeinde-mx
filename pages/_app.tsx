import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from './components/Navbar'
import { Fragment } from 'react';
import { ContextAuthProvider } from '../context/AuthContext';
// eslint-disable-next-line @next/next/no-document-import-in-page
import Head from 'next/head'





export default function App({ Component, pageProps }: AppProps) {
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
                <script src="/service-worker.js" />
              </Head>
      <Navbar />
      <Component {...pageProps} />
      </ContextAuthProvider>
    </Fragment>
      
      
    </>
  );
}
