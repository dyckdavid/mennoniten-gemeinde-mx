import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from './components/Navbar'
import { Fragment } from 'react';
import { ContextAuthProvider } from '../context/AuthContext';



export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Fragment>
      <ContextAuthProvider>
      <Navbar />
      <Component {...pageProps} />
      </ContextAuthProvider>
    </Fragment>
      
      
    </>
  );
}
