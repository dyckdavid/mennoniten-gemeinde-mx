import Link from 'next/link'
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';

import { db } from '../../firebase/config'
import { Inter } from '@next/font/google'
import { Center } from '@mantine/core'
import { Image } from '@mantine/core';
import { Text, Space } from '@mantine/core';
import { AspectRatio } from '@mantine/core';
import { Button } from '@mantine/core';
import { useRouter } from 'next/router';
import Head from 'next/head'
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { IconDownload } from '@tabler/icons-react';
import { Group, Card, Badge } from '@mantine/core';
import { Timestamp } from 'firebase/firestore/lite'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useRef } from 'react';





export default function Sermon({ sermon  }) {


    const router = useRouter();
    const { title, name, date, link, audio, speaker, audioUrl } = sermon;




    if (!link) {
        return (
            <>
            <Head>
            <title> {title} - Mennoniten Gemeinde</title>
        <meta name="description" content="Mennoniten Gemeinde" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

            </Head>
            
            <Space h="md" /><Space h="md" /><Button radius="sm" size="xl" uppercase compact className='back-button-sermons-page' onClick={() => router.back()}>
               <IconArrowNarrowLeft /><Space w="xs" /> ZÜRUCK
            </Button><Space h="xl" />
            <>
    <Center>
    <Card shadow="sm" radius="md" withBorder className='actual-sermons-card'>
      <Center>
      
</Center>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={700}>{title}</Text>
        <Badge color="pink" variant="light" size="xl">
          {date}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        {name}
      </Text>
      <Text size="sm" color="dimmed">
        {speaker}
      </Text>

      <Group position="apart" mt="md" mb="xs">
      <audio controls className='audio_sermon'>
      <source src={audio} type="audio/mpeg" />
      </audio>
      <a href={`${audio}`} download>
        <Button radius="sm" size="xl" uppercase compact className='download_button'>
      <IconDownload /><Space w="xs" /> Download
    </Button></a>

      </Group>

      
    </Card>
    </Center>
    </>
            
            <Space h="xl" /></>
        )
      }


    return (
        <>
              <Head>
        <title> {title} - Mennoniten Gemeinde</title>
        <meta name="description" content="Mennoniten Gemeinde" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Space h="md" />
      <Space h="md" />
      
        
        <Button radius="sm" size="xl" uppercase compact className='back-button-sermons-page' onClick={() => router.back()}>
        <IconArrowNarrowLeft /><Space w="xs" /> ZÜRUCK
    </Button>
      <Space h="xl" />
      <>
    <Center>
    <Card shadow="sm" radius="md" withBorder className='actual-sermons-card'>
      <Center>
      <Card.Section component="a" href="https://mennonitengemeinde.mx/" className='video-responsive'>
      <iframe
      className='video-responsive-item'
        src={link}
        title="Live"
        width="1920" height="1080"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      </Card.Section>
</Center>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={700}>{title}</Text>
        <Badge color="pink" variant="light" size="xl">
          {date}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        {name}
      </Text>

      <Text size="sm" color="dimmed">
        {speaker}
      </Text>

      <Group position="apart" mt="md" mb="xs">
      <audio controls className='audio_sermon'>
      <source src={audio} type="audio/mpeg" />
      </audio>
      <a href={`${audio}`} download>
        <Button radius="sm" size="xl" uppercase compact className='download_button'>
      <IconDownload /><Space w="xs" /> Download
    </Button></a>

      </Group>

      
    </Card>
    </Center>
    </>

      <Space h="xl" />
        
        </>
    )
}

export async function getServerSideProps({ params }) {
  const id = params.id;
 
  const sermonSnapshot = await getDoc(doc(db, 'sermons', id));
  let sermon = sermonSnapshot.data();

  if (!sermon) {
      // Handle the case when the sermon does not exist in the database
      return {
          notFound: true,
      };
  }

  sermon.id = sermonSnapshot.id;

  // Convert the Firestore Timestamp to a JavaScript Date object and then to a string
  if (sermon.created && sermon.created.toDate) {
      sermon.created = sermon.created.toDate().toISOString();
  }

  // Ensure that you only pass serializable objects to the props
  return {
      props: {
          sermon: JSON.parse(JSON.stringify(sermon)),
      },
  };
}
