import { useState } from 'react';
import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack } from '@mantine/core';
import {
  TablerIcon,
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
} from '@tabler/icons';
import { MantineLogo } from '@mantine/ds';
import { ScrollArea } from '@mantine/core';
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
import { Modal, Group } from '@mantine/core';
import Head from 'next/head'
import { TextInput } from '@mantine/core';
import { Space } from '@mantine/core';
import { Checkbox } from '@mantine/core';
import Table from './components/table'
import Cards from './components/card'
import Nav from './components/nav'



export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <>
    <Head>
        <title>admin - Mennoniten Gemeinde</title>
    </Head>
    
    

      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        title="Add Live Stream"
      >
        <TextInput
      placeholder="Title"
      label="Live Stream Title"
      description=""
      withAsterisk
    />
    <Space h="md" />
    <TextInput
      placeholder="URL"
      label=""
      description=""
      withAsterisk
    />
    <Space h="md" />
    <TextInput
      placeholder="Date"
      label=""
      description=""
      withAsterisk
    />
    <Space h="md" />
    <Checkbox
      label="PUBLIC / PRIVATE"
      description="Set Live Stream to Public or Private"
    />

<Space h="xl" />

<Button size="lg" compact>
      Add Live Stream
    </Button>


      </Modal>

      <Space h="xl" />

      <Group position="center">
        <Button onClick={() => setOpen(true)}>Add Live Stream</Button>
      </Group>

      <Space h="xl" />

      <Cards />

      
    </>
  );
}