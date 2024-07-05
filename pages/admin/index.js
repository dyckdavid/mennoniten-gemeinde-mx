import { useState } from 'react';
import Navbar from './navbar'
import { Center } from '@mantine/core';
import { Text } from '@mantine/core';
import { Title } from '@mantine/core';
import { Button, Space } from '@mantine/core';
import Link from "next/link";

import { useEffect } from 'react';

export default function Sermons() {

    useEffect(() => {
        // When the component is mounted, add the `adminPage` class to the body
        document.body.classList.add('adminPage');
    
        // When the component is unmounted, remove the `adminPage` class from the body
        return () => {
          document.body.classList.remove('adminPage');
        };
      }, []);

    return (
        <div>
            <Navbar>
                <Center>
                <Title fw={700} ta="center">Mennoniten Gemeinde Admin Page</Title>

                
                </Center>
                <Space h="xl" />
                <Center>
                <Button.Group>
                    <Link href="/admin/sermons">
      <Button variant="default" >Sermons</Button>
      </Link>
      <Link href="/admin/streamlive">
      <Button variant="default" href="/admin/streamlive">Streams</Button>
      </Link>
      <Link href="/admin/sermons">
      <Button variant="default" href="/admin/sermons">Events</Button>
      </Link>
    </Button.Group>
                </Center>
            </Navbar>
            
        </div>
        
    )

    
}

