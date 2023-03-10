/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { Center } from '@mantine/core'
import { Image } from '@mantine/core';
import Link from 'next/link'
import { Text, Space } from '@mantine/core';
import { AspectRatio } from '@mantine/core';
import { Button } from '@mantine/core';
import { useRouter } from 'next/router';
import React from 'react';




const links = [
  {
    link: '/',
    label: 'Hause',
    links: [],
  },
  {
    link: '/predigten',
    label: 'Predigten',
    links: [],

  },
  {
    link: '/live',
    label: 'Live',
    links: [],
  },

];







const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const router = useRouter();
  return (
    <>
      <Head>
        <title> Titel - Mennoniten - Gemeinde</title>
        <meta name="description" content="Mennoniten Gemeinde" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Space h="md" />
      <Space h="md" />
      
        
        <Button radius="sm" size="xl" uppercase compact className='back-button-sermons-page' onClick={() => router.back()}>
      Züruck
    </Button>
      <Space h="xl" />
      <Center>
      <div className='sermons-center-container'>
        <Center>
        <Space h="xl" />
      <iframe
      className='sermosn-media-video'
        src="https://youtube.com/embed/ZMK6g1NLSqU"
        title="Live"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      </Center>
      <h1 className='sermons-title'>Sontags Predigt Titel</h1>
      <p className='sermons-speaker'>John Dyck</p>


      <audio controls className='audio-sermon'>
      <source src="/path/to/audio.mp3" type="audio/mpeg" />
      <p>Your browser does not support the audio element.</p>
    </audio>

    <Link href="/download">
        <Button radius="sm" size="xl" uppercase compact className='download-button'>
      Download
    </Button></Link>

    


      </div>
      </Center>

      <Space h="xl" />
      
    </>
  )
}