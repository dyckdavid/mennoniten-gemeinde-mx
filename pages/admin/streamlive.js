import { useState } from 'react';
import Navbar from './navbar'
import Streams from './components/streamCard'

export default function Sermons() {

    return (
        <div>
            <Navbar>
                <Streams />
            </Navbar>
            
        </div>
        
    )
}