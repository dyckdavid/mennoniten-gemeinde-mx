import NextLink from 'next/link'
import { Card, Text, Badge, Button, Group } from '@mantine/core';
import { IconCalendar } from '@tabler/icons';
import React from 'react';
import { Center } from '@mantine/core'
import { Space } from '@mantine/core';
import Head from 'next/head'
import { AspectRatio } from '@mantine/core';


export const LiveStream = ({ stream }) => {
    const { url, Title, date, id } = stream;

    if (!url) {

        return (
            <Center>
            <h3>Keine Streams Live im Moment</h3>
            <p>Sontag um 9:00 UHR Begint der Live Stream</p>
            </Center>
        )

    }


    return (
        <>

    <Center>
            <iframe
            className='live-stream-actual'

              src={`${url}`}
              title="Live"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen />
        </Center>







        </>

    )
}
