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
  Col,
  Row,
  Container,
  Paper,
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
import { IconDatabase } from '@tabler/icons-react';
import { IconMusic } from '@tabler/icons-react';
import { IconNotebook } from '@tabler/icons-react';
import { IconSettings } from '@tabler/icons-react';
import { IconUsers } from '@tabler/icons-react';
import { IconMicrophone } from '@tabler/icons-react';
import { IconBuildingChurch } from '@tabler/icons-react';
import { IconList } from '@tabler/icons-react';
import { IconCalendarEvent } from '@tabler/icons-react';
import { IconCast } from '@tabler/icons-react';
import { IconHeadphonesFilled } from '@tabler/icons-react';
import { IconHeadset } from '@tabler/icons-react';
import { IconLogout2 } from '@tabler/icons-react';
import { IconLogout } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { IconHome2 } from '@tabler/icons-react';






export default function AppShellDemo({ children }) {
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
                  header={<Header height={{ base: 70, md: 70 }} style={{ backgroundColor: '#008cff' }}  p="md">
                      <div style={{ display: 'flex', alignItems: 'center', height: '100%', backgroundColor: '#008cff' }} >
                          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                              <Burger
                                  opened={opened}
                                  onClick={() => setOpened((o) => !o)}
                                  size="sm"
                                  color="#FFFFFF"
                                  mr="xl" />
                          </MediaQuery>

                          
                          <Link href={"/"} legacyBehavior>
          <a>
            <img className="navbar__logo" src="https://firebasestorage.googleapis.com/v0/b/mennoniten-gemeinde-797ac.appspot.com/o/2.jpg?alt=media&token=63222a19-3766-4d10-8387-0018c9ce900b" ></img>
          </a>
        </Link>
        <Text>Admin</Text>
                          <div style={{ position: 'absolute', top: 12, right: 12 }} >
  
  <ActionIcon color="red" size="xl" onClick={handleSignOut}>
              <IconLogout size="2rem" />
            </ActionIcon>
</div>
                      </div>
                  </Header>}


                  navbar={<Navbar hidden={!opened} width={{ lg: 250 }} >
                    
                    <Paper
      padding="md"
      style={{
        width: '240px',
        height: '100vh',
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
      <Link href="/admin">
        <Button fullWidth variant="light" color="blue" leftIcon={<IconHome2 size="1rem" />}>Admin Home</Button>
        </Link>
        <Space h="xs" />
      <Link href="/admin/sermons">
        <Button fullWidth variant="light" color="red" leftIcon={<IconHeadset size="1rem" />}>Sermons</Button>
        </Link>
        <Space h="xs" />
        <Link href="/admin/streamlive">
        <Button fullWidth variant="light" color="orange" leftIcon={<IconCast size="1rem" />}>Live Streams</Button>
        </Link>
        <Space h="xs" />
        <Button fullWidth variant="light" color="gray" leftIcon={<IconCalendarEvent size="1rem" />} disabled>Events</Button>
        <Space h="xs" />
        <Button fullWidth variant="light" color="yellow" leftIcon={<IconList size="1rem" />} disabled>Bulletin</Button>
        <Space h="xs" />
        <Button fullWidth variant="light" color="blue" leftIcon={<IconBuildingChurch size="1rem" />} disabled>Churches</Button>
        <Space h="xs" />
        <Button fullWidth variant="light" color="green" leftIcon={<IconMicrophone size="1rem" />} disabled>Speaker</Button>
        <Space h="xs" />
        <Button fullWidth variant="light" color="red" leftIcon={<IconUsers size="1rem" />} disabled>Users</Button>
        <Space h="xs" />
        <Button fullWidth variant="light" color="orange" leftIcon={<IconSettings size="1rem" />} disabled>Settings</Button>
        <Space h="xs" />
        <Button fullWidth variant="light" color="green" leftIcon={<IconNotebook size="1rem" />} disabled >Pages</Button>
        <Space h="xs" />
        <Button fullWidth variant="light" color="gray" leftIcon={<IconMusic size="1rem" />} disabled>Audios</Button>
      </div>
      
    </Paper>
                  </Navbar>}



              >

{children}

                  </AppShell></>
    )}
    </>
  );
}