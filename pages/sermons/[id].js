import Link from 'next/link'
import { collection, getDocs, getDoc, doc } from 'firebase/firestore/lite'
import { db } from '../../firebase/config'
import { Inter } from '@next/font/google'
import { Center } from '@mantine/core'
import { Image } from '@mantine/core';
import { Text, Space } from '@mantine/core';
import { AspectRatio } from '@mantine/core';
import { Button } from '@mantine/core';
import { useRouter } from 'next/router';
import Head from 'next/head'
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { IconDownload } from '@tabler/icons-react';




export default function Sermon({ sermon }) {
    const router = useRouter();
    const { title, name, date, link, audio, speaker } = sermon


    if (!link) {
        return (
            <>
            <Head>
            <title> {title} - Mennoniten Gemeinde</title>
        <meta name="description" content="Mennoniten Gemeinde" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

            </Head>
            
            <Space h="md" /><Space h="md" /><Button radius="sm" size="xl" uppercase compact className='back-button-sermons-page' onClick={() => router.back()}>
               <IconArrowNarrowLeft /><Space w="xs" /> ZÜRUCK
            </Button><Space h="xl" /><Center>
                    <div className='sermons-center-container-no-iframe '>

                        <h1 className='sermons-title'>{title}</h1>
                        <p className='sermons-speaker'>{speaker}</p>


                        <audio controls className='audio-sermon'>
                            <source src={audio} type="audio/mpeg" />
                            <p>Your browser does not support the audio element.</p>
                        </audio>
                        <a href={`${audio}`} download>
                            <Button radius="sm" size="xl" uppercase compact className='download-button'>
                            <IconDownload /><Space w="xs" /> Download
                            </Button></a>




                    </div>
                </Center><Space h="xl" /></>
        )
      }


    return (
        <>
              <Head>
        <title> {title} - Mennoniten Gemeinde</title>
        <meta name="description" content="Mennoniten Gemeinde" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Space h="md" />
      <Space h="md" />
      
        
        <Button radius="sm" size="xl" uppercase compact className='back-button-sermons-page' onClick={() => router.back()}>
        <IconArrowNarrowLeft /><Space w="xs" /> ZÜRUCK
    </Button>
      <Space h="xl" />
      <Center>
      <div className='sermons-center-container'>
        <Center>
        <Space h="xl" />
      <iframe
      className='sermosn-media-video'
        src={link}
        title="Live"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      </Center>
      <h1 className='sermons-title'>{title}</h1>
      <p className='sermons-speaker'>{speaker}</p>


      <audio controls className='audio-sermon'>
      <source src={audio} type="audio/mpeg" />
      <p></p>
    </audio>
    <a href={`${audio}`} download>
        <Button radius="sm" size="xl" uppercase compact className='download-button'>
      <IconDownload /><Space w="xs" /> Download
    </Button></a>

    


      </div>
      </Center>

      <Space h="xl" />
        
        </>
    )
}

export async function getServerSideProps({ params }) {
    const id = params.id
    const sermonSnapshot = await getDoc(doc(db, 'sermons', id))
    const sermon = sermonSnapshot.data()
    sermon.id = sermonSnapshot.id
    return {
        props: {
            sermon
        }
    }
}
