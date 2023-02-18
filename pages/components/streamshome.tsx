import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { Center } from '@mantine/core'
import { Image } from '@mantine/core';
import Link from 'next/link'
import { Card, Text, Badge, Button, Group } from '@mantine/core';
import { SimpleGrid } from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import { Space } from '@mantine/core';
import { createStyles } from '@mantine/core';
import { ActionIcon } from '@mantine/core';
import { IconCalendar } from '@tabler/icons';
import Streams from '../firestorelive/index'

export default function CardsHome() {

    return (
        <>
        <Space h="md" />
        <Center><h1>Live Streams</h1></Center>

        <Center>
        <Streams></Streams>
        </Center>
        <Space h="xl" />
        </>
    )



 }
