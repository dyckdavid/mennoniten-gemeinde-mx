/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { Inter } from '@next/font/google'
import { Center } from '@mantine/core'
import { Space } from '@mantine/core';
import { Loader } from '@mantine/core';







const inter = Inter({ subsets: ['latin'] })

export default function Live() {

  

  return (
    <>
   
      <><Head>
        <title> Live - Mennoniten Gemeinde</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head><Space w="md" /><Center><h1>Title</h1></Center><Space h="md" /><Center><p>Date</p></Center><Center>
          <div className='stream-main-stream-page'>
            <iframe
              className='live-stream-main-iframe'
              src="https://youtube.com/embed/NDD37wYZkLw"
              title="Live"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen />
          </div>
        </Center></>
     
    </>
  )
}