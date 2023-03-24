import { useState } from 'react';
import { MantineLogo } from '@mantine/ds';
import { ScrollArea } from '@mantine/core';
import {
  useMantineTheme,
  Button,
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

 function AppShellDemo() {

  useAuthUser();

  const { isLogged } = useContext(AuthContext);




  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <>
    {isLogged === true && (
      <>
        <Head>
          <title>admin - Live stream</title>
        </Head>
        <App />
      </>
    )}
    
    </>
  )
  
 
}

export default AppShellDemo;