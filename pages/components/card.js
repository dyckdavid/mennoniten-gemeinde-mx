/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { Center, LoadingOverlay } from '@mantine/core'
import { Image } from '@mantine/core';
import Link from 'next/link'
import { Card, Text, Badge, Button, Group } from '@mantine/core';
import { SimpleGrid } from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import { MediaQuery } from '@mantine/core';
import { IconCalendar } from '@tabler/icons';
import { useEffect, useState } from 'react';




const inter = Inter({ subsets: ['latin'] })

export default function Cards() {


  return (
    <>
    

      
        <div key={item.id}>
      <Card shadow="sm" p="lg" radius="md" withBorder className='card__predigten'>
      <Card.Section>

      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>Sontags Predigt</Text>
        <Badge color="red" variant="light" size="xl">
        <IconCalendar size={16} className="align-calendar"></IconCalendar>
          {item.date}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
Name
      </Text>

      <Link href="./sermons">
      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
      Öffnen
      </Button>
      </Link>
    </Card>
</div>
     

    </>
  )
}