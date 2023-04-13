/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { Inter } from '@next/font/google'
import { Center } from '@mantine/core'
import { Card, Badge, Button, Group } from '@mantine/core';
import Cards from '../firestore/index'
import { Text, Space, Title } from '@mantine/core';




const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title> Perdigten - Mennoniten Gemeinde</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Space h="md" />
      <Center><Title fw={700} ta="center">Predigten</Title></Center>
      <Space h="md" />
      <Cards></Cards>
      <Space h="md" />
 

    </>
  )
}