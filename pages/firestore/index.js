/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { Inter } from '@next/font/google'
import { Center } from '@mantine/core'
import { Space } from '@mantine/core';
import { Loader } from '@mantine/core';
import { db } from '../../firebase/config.js';
import { useEffect, useState} from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { SermonsCard } from '../../components/SermonCard';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { query, orderBy, limit, ref } from "firebase/firestore"



export default function Live() {


  const [sermons, setSermons] = useState([])

  useEffect(() => {
    async function getSermons() {
      const sermonSnapshot = await getDocs(collection(db, 'sermons'))
      const sermons = sermonSnapshot.docs.map(doc => {
        const data = doc.data()
        data.id = doc.id
        return data
      })
      setSermons([...sermons].sort((a, b) => b.no.localeCompare(a.no)))
    }
    getSermons()
  }, [])

  

  return (
    

    
    <><Head>
      <link rel="icon" href="/favicon.ico"></link>
    </Head><div>
        {sermons.map((sermon, index) => (
          <SermonsCard key={index} sermon={sermon} />
        ))}

      </div></>
  )
}