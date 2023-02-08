/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { Center } from '@mantine/core'
import { Image } from '@mantine/core';
import Link from 'next/link'
import { Text, Space } from '@mantine/core';
import Card from './components/homecard'
import { Button } from '@mantine/core';




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
  return (
    <>
      <Head>
        <title>Mennoniten Gemeinde</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center>

      <img className='image-home-screen' src='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg' />
      <p className='text-over-image-home'>Willkommen zu Mennoniten Gemeinde</p>
      </Center>
      <Space h="md" />
      <Center><h1>Predigten</h1></Center>
      <Space h="md" />
      <h2 className='last-sermons-text'>Hören sie unsere Predigten an!</h2>
      <Space h="md" />
      <Card></Card>
      <Space h="md" />
      <Center>
        <Link href="/predigten">
      <Button radius="sm" size="xl" uppercase compact>
      Predigten
    </Button></Link>
      </Center>
      <Space h="xl" />




    </>
  )
}