import { useState } from 'react';
import Navbar from './navbar'
import { Center } from '@mantine/core';
import { Text } from '@mantine/core';
import { Title } from '@mantine/core';
import { AspectRatio } from '@mantine/core';

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
                <Title fw={700} ta="center">Private Content</Title>

                

                
                </Center>

                <AspectRatio ratio={16 / 9}>
      <iframe
        src="https://player.vimeo.com/video/891674994?h=90ec1925dc&amp;badge=0&amp;autopause=0&amp;quality_selector=1&amp;player_id=0&amp;app_id=58479"
        title="YouTube video player"
        style={{ border: 0 }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </AspectRatio>
            </Navbar>
            
        </div>
        
    )

    
}

