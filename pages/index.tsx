/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import HeaderMenuColored from './components/nav';
import { Center } from '@mantine/core'
import { Image } from '@mantine/core';
import Link from 'next/link'
import TestNav from './components/testnav'


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
        <title>Mennoniten - Gemeinde</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TestNav></TestNav>
    </>
  )
}