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
import Head from 'next/head'





export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <>
    <Head>
        <title>admin - Mennoniten Gemeinde</title>
    </Head>
    
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="sm" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <Button>Sermons</Button>
          <Button>Live Streams</Button>
          <Button>Monatsblat</Button>
          <Button>Settings</Button>
        </Navbar>
      }
      
      footer={
        <Footer height={60} p="md">
          Mennoniten-Gemeinde
        </Footer>
      }
      header={
        <Header height={{ base: 70, md: 70 }} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }} >
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>Admin Page for Mennoniten Gemeinde</Text>
          </div>
        </Header>
      }
    >
        
    </AppShell>
    </>
  );
}