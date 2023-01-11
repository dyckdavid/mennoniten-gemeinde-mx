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
import { db } from '../components/firebase/clientApp';
import { useEffect, useState } from 'react';
import { Table } from '@mantine/core';
import { createStyles } from '@mantine/core';
import { Loader } from '@mantine/core';






const inter = Inter({ subsets: ['latin'] })

export default function Cards() {
    const [data, setData] = useState<DocumentData>([]);

    useEffect(() => {
        getDocs(collection(db, "sermons")).then((querySnapshot) => {
            const items = querySnapshot.docs.map((doc) => doc.data());
            setData(items);
        });
    }, []);

    if (data.length === 0) {
        return <Center>Loading...</Center>;
    }


  return (
    <>
    

    
    {data.map((item: DocumentData) => (
      <Card shadow="sm" p="lg" radius="md" withBorder className='card__predigten'>

      
      
      <Group position="apart" mt="md" mb="xs">
      
        <Text weight={500}>{item.title}</Text>
        
        
        <Badge color="red" variant="light" size="xl">
        <IconCalendar size={16} className="align-calendar"></IconCalendar>
        {item.date}
        </Badge>
        
      </Group>
      
      <Text size="sm" color="dimmed">
{item.speaker}
      </Text>
      

      <Link href="./sermons">
      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
      Öffnen
      </Button>
      </Link>
      
    </Card>
    ))}
    

    </>
  )
}