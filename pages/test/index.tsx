/* eslint-disable react/jsx-key */
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
import { MediaQuery } from '@mantine/core';
import { IconCalendar } from '@tabler/icons';
import { Space } from '@mantine/core';
import { collection, DocumentData, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Table } from '@mantine/core';
import { createStyles } from '@mantine/core';
import { Loader } from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { IconDownload } from '@tabler/icons-react';




export default function Cards() {

  return (
    <>
    <Center>
    <Card shadow="sm" radius="md" withBorder className='actual-sermons-card'>
      <Center>
      <Card.Section component="a" href="https://mantine.dev/" className='video-responsive'>
      <iframe
      className='video-responsive-item'
        src="https://player.vimeo.com/video/807724461?h=3127d0da7f&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
        title="Live"
        width="1920" height="1080"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      </Card.Section>
</Center>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={700}>Abendversamlung #1</Text>
        <Badge color="pink" variant="light" size="xl">
          13/03/2023
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        Donald Neufeld
      </Text>

      <Group position="apart" mt="md" mb="xs">
      <audio controls className='audio_sermon'>
      <source src="" type="audio/mpeg" />
      </audio>
      <a href="" download>
        <Button radius="sm" size="xl" uppercase compact className='download_button'>
      <IconDownload /><Space w="xs" /> Download
    </Button></a>
      </Group>

      
    </Card>
    </Center>
    </>
  )
}