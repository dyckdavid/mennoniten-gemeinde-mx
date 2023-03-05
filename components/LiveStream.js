import NextLink from 'next/link'
import { Card, Text, Badge, Button, Group } from '@mantine/core';
import { IconCalendar } from '@tabler/icons';
import React from 'react';
import { Center } from '@mantine/core'
import { Space } from '@mantine/core';
import Head from 'next/head'
import Link from "next/link";




export const LiveStream = ({ stream }) => {
    const { url, Title, date, id, order } = stream;

    if (!url) {

        return (
            <>

<Space h="xl" />

<Link href="/live">
<Card
      shadow="sm"
      p="xl"
      component="a"
      target="_blank"
      className='live-no-stream'
      withBorder
    >
      <Card.Section>
        <Center>
        <h3>Keine Live Streams in Moment verfügbar!</h3>
        </Center>
      </Card.Section>


      <Text mt="xs" color="dimmed" size="xl">
        Sontag um 9:00 UHR
      </Text>
    </Card>
            
            </Link>
            </>
        )

    }


    return (
        <>

<Link href="/live">

        <Card
      shadow="sm"
      p="xl"
      component="a"
      target="_blank"
      className='live-true-stream'
      withBorder
    >
      <Text mt="xs" color="dimmed" size="xl">
        {Title}
      </Text>
      <Card.Section>
        <Center>
        <iframe
                className='live-video'

              src={`${url}`}
              title="Live"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen />
        </Center>
      </Card.Section>


      
    </Card>


</Link>




        </>

    )
}
