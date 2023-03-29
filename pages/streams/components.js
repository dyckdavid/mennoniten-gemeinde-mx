import { IconAccessPointOff } from '@tabler/icons-react';
import { Center, Text, Space } from '@mantine/core';
import Head from 'next/head';

export default function component() {
    return (
        <>
            <Space h="xl" />
            <Text tt="uppercase" fz="xl" fs="italic" fw={700} ta="center">Es sind derzeit keine Live-Streams verfügbar.  Bitte schauen Sie später wieder vorbei.</Text>
            <Center>
                <IconAccessPointOff className='stream-off' />
            </Center>
        </>
    )
}