import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { Center } from '@mantine/core'
import { Image } from '@mantine/core';
import Link from 'next/link'
import TestNav from './components/Navbar'
import { Text, Space } from '@mantine/core';
import Card from './components/homecard'
import { Button } from '@mantine/core';


export default function Hause() {
  return (
    <>
    <Head>
        <title>Mennoniten - Gemeinde</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Center>
          <h1>COMING SOON</h1>
          <p>Check Back later</p>
        </Center>
      </div>
    
    </>

    


  )
}