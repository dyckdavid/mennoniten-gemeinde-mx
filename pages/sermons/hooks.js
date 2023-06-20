// hooks.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function useRouteChanged(callback) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = url => {
      callback();
    }

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, callback]);
}
