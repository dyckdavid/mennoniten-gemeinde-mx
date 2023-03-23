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
  const [open, setOpen] = useState(false);
  return (
    <>
    {isLogged === true && (
    <><Head>
          <title>admin - Live stream</title>
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
              withAsterisk />
            <Space h="md" />
            <TextInput
              placeholder="URL"
              label=""
              description=""
              withAsterisk />
            <Space h="md" />
            <TextInput
              placeholder="Date"
              label=""
              description=""
              withAsterisk />
            <Space h="md" />
            <Checkbox
              label="PUBLIC / PRIVATE"
              description="Public for everyone / Private for admins only" />

            <Space h="xl" />


            <Fragment>
              <Button size="lg" compact>
                Add Live Stream
              </Button>
            </Fragment>



          </Modal><Space h="xl" /><Group position="center">
            <Button onClick={() => setOpen(true)}>Add Live Stream</Button>
          </Group><Space h="xl" /><Cards /></>

      )}

      <App />
    </>
  );
}

export default AppShellDemo;