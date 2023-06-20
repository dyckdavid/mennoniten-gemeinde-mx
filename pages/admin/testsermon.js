import { useState } from 'react';
import Navbar from './navbar'
import { Text, Space, Card, Image, Badge, Button, Group, Title } from '@mantine/core';
import { useEffect} from "react";
import {db, auth, storage } from "../../lib/config";
import {
    getDocs,
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
} from "firebase/firestore";
import React from 'react';
import { Center } from '@mantine/core'
import Head from 'next/head'
import { TextInput } from '@mantine/core';
import { Modal } from '@mantine/core';
import { Checkbox } from '@mantine/core';
import { Fragment, useContext } from 'react';
import "firebase/database";
import { useCallback } from 'react';
import withAuth from './components/withAuth';
import Link from 'next/link'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Progress } from '@mantine/core';
import { FileInput, rem } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { Table } from '@mantine/core';
import { ActionIcon } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';
import { IconTrashX } from '@tabler/icons-react';
import { IconPencil } from '@tabler/icons-react';



export default function Sermons() {
    const [audioFile, setAudioFile] = useState();

    const [streamList, setStreamList] = useState([]);

    const [newStreamTitle, setNewStreamTitle] = useState("");
    const [newDate, setNewDate] = useState("");
    const [newSpeaker, setNewSpeaker] = useState("");
    const [isNewPublic, setIsNewPublic] = useState();
    const [isPublic, setIsPublic] = useState(false);
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);
    const [titleValue, setTitleValue] = useState("");
    const [dateValue, setDateValue] = useState();
    const [linkValue, setLinkValue] = useState("");
    const [speakerValue, setSpeakerValue] = useState();
    const [currentStream, setCurrentStream] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadFinished, setUploadFinished] = useState(false);

    



    console.log(audioFile);
console.log(auth.currentUser);


    
    const handleFileChange = (e) => {
        setAudioFile(e.target.files[0]);
      };
      
      
      const addSermon = () => {
        const storageRef = ref(storage, 'sermons/' + audioFile.name);
        const uploadTask = uploadBytesResumable(storageRef, audioFile);
      
        uploadTask.on('state_changed', 
        (snapshot) => {
          // Set the upload progress
          var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

          setUploadProgress(progress);
        }, 
        (error) => {
          // Handle unsuccessful uploads
        }, 
        async () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log('File available at', downloadURL);
            // Now you can add the new sermon document with the audio URL
            const sermonCollectionRef = collection(db, "testsermons");
            await addDoc(sermonCollectionRef, {
              title: newStreamTitle,
              date: newDate,
              public: isPublic,
              link: linkValue,
              speaker: newSpeaker,
              audio: downloadURL, // Add the audio URL here
              userId: auth?.currentUser?.uid,
            }).then(() => {
              setUploadProgress(100);
              setUploadFinished(true);
              console.log('Sermon added successfully');
              getStreamList();  // Refresh the list after adding the sermon
            }).catch((error) => {
              console.error('Error adding sermon:', error);
            });
          });
        });
      }
      
    
    

      


    const handleChange = async (stream) => {
      const newValue = !stream.public;
      // Update the value in Firestore
      const streamDoc = doc(db, "testsermons", stream.id);
      await updateDoc(streamDoc, { public: newValue });
      // Update the state
      const updatedStreamList = streamList.map((item) =>
        item.id === stream.id ? { ...item, public: newValue } : item
      );
      setStreamList(updatedStreamList);
    };
    


    const [updatedTitle, setUpdatedTitle] = useState("");

    const streamCollectionRef = collection(db, "testsermons");

    const initializeCollection = async () => {
      try {
        // Create a temporary document with a random ID
        const tempDocRef = await addDoc(streamCollectionRef, { temp: true });
    
        // Delete the temporary document immediately
        await deleteDoc(tempDocRef);
      } catch (err) {
        console.error("Error initializing the collection:", err);
      }
    };
    


    const getStreamList = useCallback(async () => {
      try {
        const data = await getDocs(streamCollectionRef);
        const filterData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setStreamList(filterData);
      } catch (err) {
        console.error(err);
      }
    }, []);

    useEffect(() => {
      getStreamList();

  }, []);


      const handleSuccess = () => {
        setOpens(false); // Close the popup
        getStreamList(); // Refresh the movie list
      };
      
      const handleSubmit = async () => {
        setLoading(true); // Start loading
        try {
            await addSermon(); // Call addSermon function here
        } catch (error) {
            console.error("Error uploading the sermon:", error);
        } finally {
            setLoading(false); // End loading
        }
    };
    
    
      
      
      
      const addStream = () => {
        return new Promise(async (resolve, reject) => {
          try {
            const streamCollectionRef = collection(db, "testsermons");
      
            // Check if the collection exists
            const collectionSnapshot = await getDocs(streamCollectionRef);
      
            console.log("collectionSnapshot:", collectionSnapshot); // Add this line
      
            // If the collection does not exist, initialize it
            if (collectionSnapshot.empty) {
              await initializeCollection();
            }
      
            // Add the new live stream document
            await addDoc(streamCollectionRef, {
              title: newStreamTitle,
              date: newDate,
              public: isPublic,
              link: linkValue,
              speaker: newSpeaker,
              userId: auth?.currentUser?.uid,
            });
      
            resolve();
          } catch (err) {
            console.error(err);
            reject(err);
          }
        });
      };
      
      




      const deleteMovie = async (id) => {
        const streamDoc = doc(db, "testsermons", id);
        await deleteDoc(streamDoc);
      
        // Update the state after successful deletion
        const updatedStreamList = streamList.filter((stream) => stream.id !== id);
        setStreamList(updatedStreamList);
      };
      

      const updateStream = async () => {
        try {
          const streamDoc = doc(db, "testsermons", currentStream.id);
          await updateDoc(streamDoc, {
            title: titleValue,
            date: dateValue,
            link: linkValue,
            speaker: speakerValue,
          });
          setOpen(false);
          setCurrentStream(null);
          getStreamList();
        } catch (err) {
          console.error(err);
        }
      };

      const handleEdit = (stream) => {
        setCurrentStream(stream);
        setTitleValue(stream.title);
        setDateValue(stream.date);
        setSpeakerValue(stream.speaker);
        setLinkValue(stream.link);
        setIsPublic(stream.public);
        setOpen(true);
      };



    return (
        <div>
            <Navbar>
            <Title fw={700} ta="center">Manage Sermons</Title>

            <>
        
        <>
        
        <Head>
          <title>admin - Sermons</title>
        </Head>
        
        <Modal
          opened={opens}
          onClose={() => {
            setOpens(false);
            setUploadProgress(0);  // Reset the progress here
            setUploadFinished(false); // Reset the uploadFinished state when closing the modal
          }}
          title="Add Sermon"
        >
          {uploadFinished ? <Text>The sermon has been uploaded successfully!</Text> : null}
            <TextInput
              placeholder="Title"
              label="Live Stream Title"
              onChange={(e) => setNewStreamTitle(e.target.value)}
              description=""
              withAsterisk />
            <Space h="md" />
            <TextInput
              placeholder="URL"
              label="link"
              onChange={(e) => setLinkValue(e.target.value)}
              description=""
              withAsterisk />
            <Space h="md" />
            <TextInput
              placeholder="Date"
              label="Date"
              description=""
              onChange={(e) => setNewDate(e.target.value)}
              />
              <Space h="md" />
            <TextInput
              placeholder="Speaker"
              label="Speaker"
              description=""
              onChange={(e) => setNewSpeaker(e.target.value)}
             />
            <Space h="md" />
            <Space h="md" />
            <input type="file" onChange={handleFileChange} />


            <Space h="md" />
            <Progress value={uploadProgress} radius="xl" size="xl" label={uploadProgress} />
            <Space h="md" />
           
{uploadProgress !== 100 && (
  <Button onClick={() => setOpens(false)}>Cancel</Button>
    
  )}


<Space h="md" />
            <Checkbox
              label="PUBLIC / HIDDEN"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              description="Public for everyone / HIDDEN for everyone" />

            <Space h="xl" />


            <Fragment>
  <Button
    size="lg"
    compact
    onClick={handleSubmit}
    disabled={!newStreamTitle || !linkValue || loading}
    loading={loading}
  >
    Add Sermon
  </Button>
</Fragment>




          </Modal><Space h="xl" /><Group position="center">
            <Button onClick={() => setOpens(true)} >Add Sermon</Button>
          </Group><Space h="xl" />



          
          </>

          {streamList.length === 0 && (
            <Center>

    No Sermons available. Click the Add Sermon button to add one.

  </Center>
)}
        <div>
        
            {streamList.map((stream) => (
                <><div key={stream.id}>
               


              </div><><Modal
                opened={open}
                onClose={() => setOpen(false)}
                title="Edit Sermon"
              >

                <TextInput
                  placeholder="Title"
                  label="Live Stream Title"
                  description=""
                  value={titleValue}
                  onChange={(event) => setTitleValue(event.target.value)} />
                <Space h="md" />
                <TextInput
                  placeholder="url"
                  label="Link"
                  description=""
                  value={linkValue}
                  onChange={(event) => setLinkValue(event.target.value)}
                   />
                <Space h="md" />
                <TextInput
                  placeholder="speaker"
                  label="Name of Speaker"
                  description=""
                  value={speakerValue}
                  onChange={(event) => setSpeakerValue(event.target.value)}
                   />
                <Space h="md" />
                <TextInput
                  placeholder="date"
                  label="stream date"
                  description=""
                  value={dateValue}
                  onChange={(event) => setDateValue(event.target.value)}
                   />
                <Space h="md" />
                <Checkbox
                  label="PUBLIC / HIDDEN"
                  checked={stream.public}
                  onChange={() => handleChange(stream)}
                  description="Public for everyone / HIDDEN for everyone" />


                <Space h="xl" />




                <Fragment>
                  <Button size="lg" compact onClick={updateStream}>
                    Update Live Stream
                  </Button>
                </Fragment>




              </Modal><Center>
                    <Card shadow="sm" p="lg" radius="md" withBorder className='admin-live-card'>

                      <Card.Section>
                        <h1 className='padding-text-live-admin' style={{ color: stream.public ? 'green' : 'red' }}>{stream.title}</h1>
                        <h2 className='padding-text-live-admin'>{stream.speaker}</h2>
                      </Card.Section>
                      <Link href={stream.public ? "/streams/live" : ""}> 
                       <Button color="red" disabled={!stream.public}>
                         View Stream
                        </Button>
                      </Link>
                      <Group position="apart" mt="md" mb="xs">
                        <Text weight={505}>{stream.link}</Text>
                        <Badge color="red" variant="light" size="xl">
                          {stream.date}
                        </Badge>
                      </Group>
                      <Checkbox
              label="Public or Hidden"
              checked={stream.public}
              onChange={() => handleChange(stream)}
            />


                      <div style={{ display: 'flex' }}>
                        <Button variant="light" color="blue" fullWidth mt="md" radius="md"onClick={() => handleEdit(stream)}>
                          EDIT
                        </Button>
                        <Space w="md" />
                        <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={() => deleteMovie(stream.id)}>
                          DELETE 
                        </Button>

                      </div>


                    </Card>


                  </Center>

                  <Center>

                  <Table verticalSpacing="xs" className='table-width-sermon-admin' striped fontSize="md" highlightOnHover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Date</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      <tr key="name">
      <td>{stream.id}</td>
      <td>{stream.title}</td>
      <td>{stream.date}</td>
      <td><ActionIcon color="yellow" size="lg" onClick={() => handleEdit(stream)}>
      <IconPencil size="1.125rem" />
    </ActionIcon></td>
      <td><ActionIcon color="red" size="lg" onClick={() => deleteMovie(stream.id)}>
      <IconTrashX size="1.125rem" />
    </ActionIcon></td>

    </tr>
      </tbody>
    </Table>

    </Center>
                  
                  </></>
            ))}
        </div>
        
        </>

            


            </Navbar>
            
        </div>
        
    )
            
}

