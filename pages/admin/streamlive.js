import { useState } from 'react';
import Navbar from './navbar'
import Streams from './components/streamCard'
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
                <Streams />
            </Navbar>
            
        </div>
        
    )
}