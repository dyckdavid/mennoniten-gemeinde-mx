import Image from "next/image";
import Head from 'next/head'
import { Inter } from '@next/font/google'
import { Center } from '@mantine/core'
import Link from 'next/link'
import { Space } from '@mantine/core';
import Card from './components/homecard'
import { Button } from '@mantine/core';
import Streams from './components/streamshome'
import Homeimage from "../components/images/km5.jpg"
import { IconPointFilled } from '@tabler/icons-react';






const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Mennoniten Gemeinde</title>
        <meta name="description" content="Mennoniten Gemeinde" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json"></link>
      </Head>
      <Center>





      
      </Center>

      <div className="image-container">
      <div className="image-wrapper">
        <Image 
          src={Homeimage}
          alt="MG"
          layout="responsive"
          width={1000} // replace with your image's width
          height={500} // replace with your image's height
        />
        <div></div>
      </div>
      <div className="centered-text">
        <div>Willkommen zu Mennoniten Gemeinde</div>
        <hr className="blue-line"/>
        <div className="lower-text-home-page">Wir aber Predigen den gekreuzten Christus. 1. Korinter 1, 23</div>
      </div>
    </div>
      <Space h="md" />
      <Center><h1>Predigten</h1></Center>
      <Space h="md" />
      <Center>
      <div className="home-sermons-div">
      <h2 className='last-sermons-text'>Hören sie unsere Predigten an!</h2>
      <Space h="md" />
      
      <Card></Card>
      
      <Space h="md" />
      <Center>
        <Link href="/sermons/1">
      <Button radius="sm" size="xl" uppercase compact>
      Alle Predigten
    </Button></Link>
      </Center>
      </div>
      </Center>
      <Space h="xl" />
      <Streams></Streams>
     
      <Space h="xl" />



    </>
  )
}