import { Card, Text, Badge, Button, Group } from '@mantine/core';
import React from 'react';
import { Center } from '@mantine/core'
import { Space } from '@mantine/core';
import Head from 'next/head'
import Link from "next/link";
import { IconCastOff } from '@tabler/icons-react';



export const LiveStream = ({ stream }) => {
    const { url, Title, date, speaker, id, order } = stream;

    if (!url) {

        return (
            <>
<Center>
<IconCastOff />
</Center>


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
      <Link href="/predigten">
      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Predigten
      </Button>
      
      </Link>


    </Card>
            
            </Link>
            </>
        )

    }


    return (
        <>

<Link href="/live">

  
<Center>
        <Card
      shadow="sm"
      p="xl"
      component="a"
      target="_blank"
      className='live-true-stream'
      withBorder
    >
      
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
        <Group position="apart" mt="md" mb="xs" className='info-live-stream'>
        <Text weight={500} size="xl">{Title}</Text>
        <Badge color="pink" variant="light">
         {date}
        </Badge>
      </Group>
      </Card.Section>
      <Text mt="xs" color="dimmed" size="lg">
        {speaker}
      </Text>

      
    </Card>
</Center>

</Link>




        </>

    )
}
