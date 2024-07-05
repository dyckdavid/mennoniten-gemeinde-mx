import Link from 'next/link'
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../firebase/config';
import { Center, Image, Text, Space, AspectRatio, Button, Group, Card, Badge } from '@mantine/core';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { IconArrowNarrowLeft, IconDownload } from '@tabler/icons-react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import React, { useState, useEffect } from 'react';

export default function Sermon({ sermon }) {
  const router = useRouter();
  const { title, name, date, link, audio, speaker } = sermon;

  const [downloadUrl, setDownloadUrl] = useState(null);

  useEffect(() => {
    if (audio) {
      console.log('Audio reference:', audio);

      const storage = getStorage();
      const audioRef = ref(storage, audio);

      getDownloadURL(audioRef)
        .then((url) => {
          console.log('Download URL:', url);
          setDownloadUrl(url);
        })
        .catch((error) => {
          console.error('Error getting download URL:', error);
        });
    }
  }, [audio]);

  const getSimpleFileName = (url) => {
    const decodedUrl = decodeURIComponent(url);
    const urlParts = decodedUrl.split('/');
    let fileName = urlParts[urlParts.length - 1].split('?')[0];
    fileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    return fileName;
  };

  const simpleFileName = getSimpleFileName(audio);

  const handleDownload = async () => {
    if (!downloadUrl) {
      console.error('Download URL not set');
      return;
    }

    try {
      const response = await fetch(downloadUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = getSimpleFileName(downloadUrl);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  if (!audio && !link) {
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
        <Center>
          <Card shadow="sm" radius="md" withBorder className='actual-sermons-card'>
            <Group position="apart" mt="md" mb="xs">
              <Text weight={700}>{title}</Text>
              <Badge color="pink" variant="light" size="xl">{date}</Badge>
            </Group>
            <Text size="sm" color="dimmed">{name}</Text>
            <Text size="sm" color="dimmed">{speaker}</Text>
          </Card>
        </Center>
        <Space h="xl" />
      </>
    );
  }

  if (!audio) {
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
              <Badge color="pink" variant="light" size="xl">{date}</Badge>
            </Group>
            <Text size="sm" color="dimmed">{name}</Text>
            <Text size="sm" color="dimmed">{speaker}</Text>
          </Card>
        </Center>
        <Space h="xl" />
      </>
    );
  }

  if (!link) {
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
        <Center>
          <Card shadow="sm" radius="md" withBorder className='actual-sermons-card'>
            <Group position="apart" mt="md" mb="xs">
              <Text weight={700}>{title}</Text>
              <Badge color="pink" variant="light" size="xl">{date}</Badge>
            </Group>
            <Text size="sm" color="dimmed">{name}</Text>
            <Text size="sm" color="dimmed">{speaker}</Text>
            <Group position="apart" mt="md" mb="xs">
              <audio controls className='audio_sermon'>
                <source src={audio} type="audio/mpeg" />
              </audio>
              {downloadUrl && (
                <Button radius="sm" size="xl" uppercase compact className='download_button' onClick={handleDownload}>
                  <IconDownload /><Space w="xs" /> Download
                </Button>
              )}
            </Group>
          </Card>
        </Center>
        <Space h="xl" />
      </>
    );
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
            <Badge color="pink" variant="light" size="xl">{date}</Badge>
          </Group>
          <Text size="sm" color="dimmed">{name}</Text>
          <Text size="sm" color="dimmed">{speaker}</Text>
          <Group position="apart" mt="md" mb="xs">
            <audio controls className='audio_sermon'>
              <source src={downloadUrl || audio} type="audio/mpeg" />
            </audio>
            {downloadUrl && (
              <Button radius="sm" size="xl" uppercase compact className='download_button' onClick={handleDownload}>
                <IconDownload /><Space w="xs" /> Download
              </Button>
            )}
          </Group>
        </Card>
      </Center>
      <Space h="xl" />
    </>
  );
}

export async function getServerSideProps({ params }) {
  const id = params.id;
 
  const sermonSnapshot = await getDoc(doc(db, 'sermons', id));
  let sermon = sermonSnapshot.data();

  if (!sermon) {
    return {
      notFound: true,
    };
  }

  sermon.id = sermonSnapshot.id;

  if (sermon.created && sermon.created.toDate) {
    sermon.created = sermon.created.toDate().toISOString();
  }

  return {
    props: {
      sermon: JSON.parse(JSON.stringify(sermon)),
    },
  };
}
