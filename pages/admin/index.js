import { useState } from 'react';
import { MantineLogo } from '@mantine/ds';
import { ScrollArea } from '@mantine/core';
import {
  useMantineTheme,
  Button,
  Container,
  Col,
  Row,
  Paper,
  Text,
} from '@mantine/core';
import { Modal, Group } from '@mantine/core';
import Head from 'next/head'
import { TextInput } from '@mantine/core';
import { Space } from '@mantine/core';
import { Checkbox } from '@mantine/core';
import Cards from './components/card'
import { useAuthUser } from '../../hooks/useAuthUser';
import AuthContext from '../../context/AuthContext';
import { Fragment, useContext } from 'react';
import Link from 'next/link'
import App from './components/streamCard';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

 function AppShellDemo() {

  useAuthUser();

  const { isLogged } = useContext(AuthContext);


  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      // Redirect user to the sign in page or perform any other action after signing out
      router.push('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <>
    {isLogged === true && (
      <>
        <Head>
          <title>admin - Live stream</title>
        </Head>
        <div style={{ position: 'absolute', top: 80, right: 10 }}>
  <Button onClick={handleSignOut}>Sign Out</Button>
</div>
        <App />
      </>
    )}
    
    </>
  )
  
 
}

export default AppShellDemo;