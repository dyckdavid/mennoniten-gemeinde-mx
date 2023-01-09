/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { Center } from '@mantine/core'
import { Image } from '@mantine/core';
import Link from 'next/link'
import { Card, Text, Badge, Button, Group } from '@mantine/core';
import { SimpleGrid } from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import { Space } from '@mantine/core';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    container: {
      width: 1200,
  
      // Media query with value from theme
      [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      },
  
      // Static media query
      '@media (max-width: 800px)': {
        backgroundColor: theme.colors.orange[6],
      },
    },
  }));
  


const inter = Inter({ subsets: ['latin'] })

export default function CardsHome() {
    const { classes } = useStyles();
  return (
    <>
    

    <Center>
      <Card shadow="sm" p="lg" radius="md" mt="md" withBorder className='conatiner-home-screen'>
      <Card.Section>

      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>Sontags Predigt</Text>
        <Badge color="pink" variant="light" size="lg">
          1/8/22
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
Enrique Bartsch
      </Text>
      <Link href="/predigten">
      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
      Öfnen
      </Button>
    </Link>
    </Card>
    </Center>
    <Space h="md" />
    <Center>
    <Card shadow="sm" p="lg" radius="md" withBorder className='conatiner-home-screen'>
      <Card.Section>

      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>Sontags Predigt</Text>
        <Badge color="pink" variant="light" size="lg">
          2/8/22
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
John Dyck
      </Text>
      <Link href="/predigten">
      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
      Öfnen
      </Button>
    </Link>
    </Card>
    </Center>
    <Space h="md" />
    <Center>
    <Card shadow="sm" p="lg" radius="md" withBorder className='conatiner-home-screen'>
      <Card.Section>

      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>Sontags Predigt</Text>
        <Badge color="pink" variant="light" size="lg">
          3/8/22
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
Riky Wall
      </Text>
    <Link href="/predigten">
      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Öfnen
      </Button>
    </Link>
    </Card>
</Center>
<Space h="xl" />
 

    </>
  )
}