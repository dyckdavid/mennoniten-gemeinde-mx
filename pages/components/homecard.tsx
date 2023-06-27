/* eslint-disable @next/next/google-font-display */
/* eslint-disable @next/next/no-page-custom-font */
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
import { ActionIcon } from '@mantine/core';
import { IconCalendar } from '@tabler/icons';
import { useEffect, useState } from "react";
import { getRandomData } from "../../components/getRandomData";


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
    const [data, setData] = useState<any[]>([]);


    useEffect(() => {
      async function fetchData() {
        try {
          const randomData = await getRandomData();
          console.log(randomData);
          setData(randomData);
        } catch (error) {
          console.error('An error occurred: ', error);
        }
      }
    
      fetchData();
    }, []);


  return (
    <>


{data.map((item, index) => (
  <Center key={index}>
    <Card shadow="sm" p="lg" radius="md" mt="md" withBorder className='conatiner-home-screen'>
      <Card.Section>

      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{item.title}</Text>
        <Badge color="red" variant="light" size="xl">
        <IconCalendar size={16} className="align-calendar"></IconCalendar>

          {item.date}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        
{item.name}
      </Text>
      <Link href={`../testsermon/${item.id}`}>
      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
      Öffnen
      </Button>
    </Link>
    </Card>
  </Center>
))}
<Space h="xl" />
 

    </>
  )
}