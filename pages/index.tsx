
import Head from 'next/head'
import { Inter } from '@next/font/google'
import { Center } from '@mantine/core'
import Link from 'next/link'
import { Space } from '@mantine/core';
import Card from './components/homecard'
import { Button } from '@mantine/core';
import Streams from './components/streamshome'







const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Mennoniten Gemeinde</title>
        <meta name="description" content="Mennoniten Gemeinde" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center>

      <img className='image-home-screen' src='https://firebasestorage.googleapis.com/v0/b/mennoniten-gemeinde-797ac.appspot.com/o/Soothing-nature-backgrounds-2.jpg.webp?alt=media&token=ae6aaec2-9f89-40ad-a803-a55d5bcc1713' />
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
      <Streams></Streams>
      <Center>
        <Link href="/live">
      <Button radius="sm" size="xl" uppercase compact>
      Live Streams
    </Button></Link>
      </Center>
      <Space h="xl" />



    </>
  )
}