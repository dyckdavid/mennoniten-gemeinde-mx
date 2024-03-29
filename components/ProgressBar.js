import Router from 'next/router';
import NProgress from 'nprogress';
import { useEffect } from 'react';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function ProgressBar() {
  useEffect(() => {
    NProgress.configure({
      showSpinner: false,
      trickleSpeed: 100,
    });
  }, []);

  return null;
}
