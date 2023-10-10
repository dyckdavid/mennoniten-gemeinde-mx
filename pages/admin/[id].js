import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from './navbar'
import { db, storage } from "../../lib/config";
import {
    getDoc,
    doc,
    updateDoc
} from "firebase/firestore";
import { TextInput, Button, Checkbox, Space, Card } from '@mantine/core';

export default function EditSermon() {
    const router = useRouter();
    const { id } = router.query;

    // State for sermon data
    const [sermonData, setSermonData] = useState({
        title: '',
        date: '',
        speaker: '',
        link: '',
        public: false
    });

    useEffect(() => {
        if (id) {
            const fetchSermon = async () => {
                const streamDoc = doc(db, "sermons", id);
                const streamSnapshot = await getDoc(streamDoc);
                if (streamSnapshot.exists()) {
                    setSermonData(streamSnapshot.data());
                }
            };

            fetchSermon();
        }
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSermonData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleUpdateSermon = async () => {
        const streamDoc = doc(db, "sermons", id);
        await updateDoc(streamDoc, sermonData);
        router.push('/admin/sermons');  // redirect to sermons page after updating
    };

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
            <Button 
    onClick={() => router.back()} 
    style={{ 
        
        top: '10px', 
        left: '20px',
        zIndex: 1000 // This ensures the button is above other content if there's any overlap
    }}
>
    Go Back
</Button>
<Space h="xl" />
<Card shadow="sm" padding="lg" radius="md" withBorder>


            <TextInput
                name="title"
                placeholder="Title"
                label="Live Stream Title"
                value={sermonData.title}
                onChange={handleInputChange}
            />
            {/* Repeat TextInput components for other fields */}
            <TextInput
                name="date"
                placeholder="Date"
                label="Stream Date"
                value={sermonData.date}
                onChange={handleInputChange}
            />
            <TextInput
                name="speaker"
                placeholder="Speaker"
                label="Name of Speaker"
                value={sermonData.speaker}
                onChange={handleInputChange}
            />
            <TextInput
                name="link"
                placeholder="Link"
                label="Link"
                value={sermonData.link}
                onChange={handleInputChange}
            />
            <Checkbox
                checked={sermonData.public}
                onChange={(e) => setSermonData({ ...sermonData, public: e.target.checked })}
                label="PUBLIC / HIDDEN"
                description="Public for everyone / HIDDEN for everyone"
            />
            <Button onClick={handleUpdateSermon}>
                Update Sermon
            </Button>
            </Card>
            </Navbar>
        </div>
        
    );
}
