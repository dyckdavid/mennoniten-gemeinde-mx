import { useState } from 'react';
import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack } from '@mantine/core';

import {
  AppShell,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Button,
} from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { ScrollArea } from '@mantine/core';
import { Modal, Group } from '@mantine/core';
import Head from 'next/head'
import { TextInput } from '@mantine/core';
import { Space } from '@mantine/core';
import { Checkbox } from '@mantine/core';
import Cards from './components/card'
import { useAuthUser } from '../../hooks/useAuthUser';

import AuthContext from '../../context/AuthContext'
import { Fragment, useContext } from 'react';
import Link from 'next/link'
import Stream from './components/streamCard';
import { getAuth, signOut } from 'firebase/auth';
import router, { useRouter } from 'next/router';
import NavBar from './components/nav'





export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [open, setOpen] = useState(false);

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


  return (
    <>
    {isLogged === true && (
    <><Head>
                  <title>admin - Live Stream</title>
              </Head><AppShell
                  header={<Header height={{ base: 70, md: 70 }} p="md">
                      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                              <Burger
                                  opened={opened}
                                  onClick={() => setOpened((o) => !o)}
                                  size="sm"
                                  color={theme.colors.gray[6]}
                                  mr="xl" />
                          </MediaQuery>

                          <Text>Admin Page for Mennoniten Gemeinde</Text>
                          <div style={{ position: 'absolute', top: 12, right: 12 }}>
  <Button onClick={handleSignOut}>Sign Out</Button>
</div>
                      </div>
                  </Header>}


                  navbar={<Navbar hidden={!opened} width={{ lg: 250 }}>
                      <Button>Sermons</Button>
                      <Button>Live Streams</Button>
                      <Button>Monatsblat</Button>
                      <Button>Settings</Button>
                  </Navbar>}



              >

                <Stream />

                  </AppShell></>
    )}
    </>
  );
}