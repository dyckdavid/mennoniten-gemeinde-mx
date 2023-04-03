import { useState } from 'react';
import {
  AppShell,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';

export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      footer={
        <Footer height={60} p="md">
          Mennoniten Gemeinde
        </Footer>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>Mennoniten Gemeinde</Text>

            <MediaQuery largerThan="sm">
              <div style={{ marginLeft: 'auto' }}>
                {/* Add your navbar content here */}
                <Text>Application navbar</Text>
              </div>
            </MediaQuery>

            {/* Mobile navbar content */}
            <MediaQuery smallerThan="sm">
              <div
                style={{
                  display: opened ? 'block' : 'none',
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  background: theme.colors.gray[0],
                  width: '100%',
                  zIndex: 1000,
                  padding: theme.spacing.md,
                }}
              >
                {/* Add your mobile navbar content here */}
                <Text>Application navbar</Text>
              </div>
            </MediaQuery>
          </div>
        </Header>
      }
    >
        <main style={{ paddingTop: 0, paddingBottom: 0 }}>
        {children}
      </main>
      {/* Your website content */}
    </AppShell>
  );
}
