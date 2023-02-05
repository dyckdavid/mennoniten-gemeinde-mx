import NextLink from 'next/link'
import { Card, Text, Badge, Button, Group } from '@mantine/core';
import { IconCalendar } from '@tabler/icons';
import React from 'react';
import { Center } from '@mantine/core'
import { Space } from '@mantine/core';
import Head from 'next/head'




export const LiveStream = ({ stream }) => {
    const { url, Title, date, id } = stream;

    if (!url) {

        return (
            <>

<Space h="xl" />

<Card
      shadow="sm"
      p="xl"
      component="a"
      href="/"
      target="_blank"
      className='live-no-stream'
      withBorder
    >
      <Card.Section>
        <Center>
        <h3>Sontag um 9:00 UHR</h3>
        </Center>
      </Card.Section>


      <Text mt="xs" color="dimmed" size="xl">
        Keine Live Streams in Moment verfügbar
      </Text>
    </Card>
            
            
            </>
        )

    }


    return (
        <>



        <Card
      shadow="sm"
      p="xl"
      component="a"
      href="/"
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
      </Card.Section>


      <Text mt="xs" color="dimmed" size="xl">
        {Title}
      </Text>
    </Card>







        </>

    )
}
