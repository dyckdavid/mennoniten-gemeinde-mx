import { useState } from 'react';
import Head from 'next/head'
import { db } from '../../../firebase/config.js';
import { useEffect} from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { AdminLive } from '../../../components/AdminLive';



export default function Cards() {
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
          <AdminLive key={index} stream={stream} />
        ))}

</>
     
    </>
    );
  }