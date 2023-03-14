/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { Center } from '@mantine/core'
import { Space } from '@mantine/core';
import { Loader } from '@mantine/core';
import { db } from '../../firebase/config.js';
import { useEffect, useState} from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { SermonsCard } from '../../components/SermonCard';
import LiveStream from '../firestorelive/index'







export default function Live() {




  

  return (

    <><Head>
      <title> Live - Mennoniten Gemeinde</title>
        <meta name="description" content="Mennoniten Gemeinde" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

    </Head>
    
    <><Center>
        <LiveStream />
      </Center>

      </>
      
      
      
      
      </>

 
        
     
    
  )
}