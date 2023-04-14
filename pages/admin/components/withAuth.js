import React from 'react';
import { useRouter } from 'next/router';
import { useAuthUser } from '../../../hooks/useAuthUser';

const withAuth = (Component) => {
  const AuthWrappedComponent = (props) => {
    const { isLogged } = useAuthUser();
    const router = useRouter();

    React.useEffect(() => {
      if (!isLogged) {
        router.push('/signin');
      }
    }, [isLogged, router]);

    return <Component {...props} />;
  };

  return AuthWrappedComponent;
};

export default withAuth;
