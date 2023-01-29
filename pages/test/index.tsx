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





const inter = Inter({ subsets: ['latin'] })

export default function Cards() {
   


  return (
    <>
    <Space h="md" />

    
    
      
      <div >
        
      <Card shadow="sm" p="lg" radius="md" withBorder className='card__predigten'>

      
      
      <Group position="apart" mt="md" mb="xs">
      
        <Text weight={500}></Text>
        
        
        <Badge color="red" variant="light" size="xl">
        <IconCalendar size={16} className="align-calendar"></IconCalendar>
        Date
        </Badge>
        
      </Group>
      
      <Text size="sm" color="dimmed">
Speaker
      </Text>
      

      <Link href="/live">
      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
      Öffnen
      </Button>
      </Link>
      
    </Card>
    </div>
    
    

    </>
  )
}