import { useState } from 'react';
import Navbar from './navbar'
import { Center } from '@mantine/core';
import { Text } from '@mantine/core';
import { Title } from '@mantine/core';
import { Button, Group } from '@mantine/core';
import { SpotlightProvider, spotlight } from '@mantine/spotlight';
import { SpotlightAction } from '@mantine/spotlight';
import { IconHome, IconDashboard, IconFileText, IconSearch } from '@tabler/icons-react';
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
            </Navbar>
            
        </div>
        
    )

    
}

