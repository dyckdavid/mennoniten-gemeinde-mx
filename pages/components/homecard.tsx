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




const inter = Inter({ subsets: ['latin'] })

export default function Cards() {
  return (
    <>
    


      <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>

      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>Sontags Predigt</Text>
        <Badge color="pink" variant="light">
          1/8/22
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
Enrique Bartsch
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Open
      </Button>
    </Card>
    <Space h="md" />

    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>

      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>Sontags Predigt</Text>
        <Badge color="pink" variant="light">
          1/8/22
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
Enrique Bartsch
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Open
      </Button>
    </Card>
    <Space h="md" />

    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>

      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>Sontags Predigt</Text>
        <Badge color="pink" variant="light">
          1/8/22
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
Enrique Bartsch
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Open
      </Button>
    </Card>

 

    </>
  )
}