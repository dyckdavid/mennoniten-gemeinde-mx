/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { Center } from '@mantine/core'
import { Space } from '@mantine/core';
import { Loader } from '@mantine/core';
import { db } from '../../firebase/config.js';
import { useEffect, useState} from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { LiveStream } from '../../components/LiveStream';










export default function Live() {

  const [streams, setStreams] = useState([])

  useEffect(() => {
    async function getStreams() {
      const streamCollection = collection(db, 'streamslive')
      const streamSnapshot = await getDocs(streamCollection)
      const streams = streamSnapshot.docs.map(doc => {
        const data = doc.data()
        data.id = doc.id
        return data
      })
      setStreams(streams)
    }
    getStreams()
  }, [])


  

  return (
    <>
   
      <><Head>

      </Head>

      {streams.map((stream, index) => (
          <LiveStream key={index} stream={stream} />
        ))}

</>
     
    </>
  )
}