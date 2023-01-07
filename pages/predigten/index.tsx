/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { Center } from '@mantine/core'
import { Image } from '@mantine/core';
import Link from 'next/link'
import { Card, Badge, Button, Group } from '@mantine/core';
import Cards from '../components/card'
import { Text, Space } from '@mantine/core';




const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title> Perdigten - Mennoniten - Gemeinde</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Space h="md" />
      <Center><h1>Predigten</h1></Center>
      <Space h="md" />
      <Cards></Cards>
      <Space h="md" />
 

    </>
  )
}