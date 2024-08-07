import { useState } from 'react';
import { DateInput } from '@mantine/dates';
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
import { deleteObject } from "firebase/storage";
import { getStorage } from "firebase/storage";
import firebase from "firebase/compat/app";
import { serverTimestamp } from "firebase/firestore";
import { query, orderBy } from 'firebase/firestore';





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
    const [timeValue, setTimeValue] = useState();
    const [linkValue, setLinkValue] = useState("");
    const [speakerValue, setSpeakerValue] = useState();
    const [currentStream, setCurrentStream] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadFinished, setUploadFinished] = useState(false);
    const [updatedAudioFile, setUpdatedAudioFile] = useState();


    
    useEffect(() => {
      // When the component is mounted, add the `adminPage` class to the body
      document.body.classList.add('adminPage');
  
      // When the component is unmounted, remove the `adminPage` class from the body
      return () => {
        document.body.classList.remove('adminPage');
      };
    }, []);


    console.log(audioFile);
console.log(auth.currentUser);


    
    const handleFileChange = (e) => {
        setAudioFile(e.target.files[0]);
      };
      
      
      const addSermon = async () => {
        let downloadURL = null; // Changed to null to avoid adding an empty string
        if (audioFile) {
          const storageRef = ref(storage, 'webloaded/' + audioFile.name);
          const uploadTask = uploadBytesResumable(storageRef, audioFile);
      
          uploadTask.on('state_changed',
            (snapshot) => {
              const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              setUploadProgress(progress);
            },
            (error) => {
              console.error("Error during file upload:", error);
            },
            async () => {
              downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              await addSermonDoc(downloadURL); // Add the sermon document with audio URL
            }
          );
        } else {
          await addSermonDoc(downloadURL); // Add the sermon document without audio URL
        }
      };
      
      const addSermonDoc = async (downloadURL) => {
        const sermonCollectionRef = collection(db, "sermons");
        const newSermon = {
          title: newStreamTitle,
          date: newDate,
          public: isPublic,
          link: linkValue,
          speaker: newSpeaker,
          userId: auth?.currentUser?.uid,
          created: serverTimestamp()
        };
        
        if (downloadURL) {
          newSermon.audio = downloadURL; // Only add audio field if there is a URL
        }
      
        await addDoc(sermonCollectionRef, newSermon);
      
        setUploadProgress(100);
        setUploadFinished(true);
        console.log('Sermon added successfully');
        getStreamList();
      };
      
      
    
    

      


    const handleChange = async (stream) => {
      const newValue = !stream.public;
      // Update the value in Firestore
      const streamDoc = doc(db, "sermons", stream.id);
      await updateDoc(streamDoc, { public: newValue });
      // Update the state
      const updatedStreamList = streamList.map((item) =>
        item.id === stream.id ? { ...item, public: newValue } : item
      );
      setStreamList(updatedStreamList);
    };
    


    const [updatedTitle, setUpdatedTitle] = useState("");

    const streamCollectionRef = collection(db, "sermons");

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
        const q = query(streamCollectionRef, orderBy('created', 'desc'));
        const data = await getDocs(q);
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
  
      // Debug: check the data length after 3 seconds
      setTimeout(() => {
        if (streamList.length === 0) {
          console.log("No data after 3 seconds");
        }
      }, 5000);
    }, [getStreamList, streamList]);


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
            const streamCollectionRef = collection(db, "sermons");
      
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
        const streamDoc = doc(db, "sermons", id);
        await deleteDoc(streamDoc);
      
        // Update the state after successful deletion
        const updatedStreamList = streamList.filter((stream) => stream.id !== id);
        setStreamList(updatedStreamList);
      };
      

      const updateStream = async () => {
        try {
            const streamDoc = doc(db, "sermons", currentStream.id);
    
            if (updatedAudioFile) {
                // Delete the old audio file
                const oldAudioRef = ref(storage, currentStream.audio);
                await deleteObject(oldAudioRef);
    
                // Upload the new audio file
                const newAudioRef = ref(storage, 'sermons/' + updatedAudioFile.name);
                const uploadTask = uploadBytesResumable(newAudioRef, updatedAudioFile);
                await uploadTask;
                const newAudioURL = await getDownloadURL(uploadTask.snapshot.ref);
    
                // Update the sermon document with the new audio URL
                await updateDoc(streamDoc, {
                    title: titleValue,
                    date: dateValue,
                    link: linkValue,
                    speaker: speakerValue,
                    audio: newAudioURL,
                });
            } else {
                // Update the sermon document without changing the audio
                await updateDoc(streamDoc, {
                    title: titleValue,
                    date: dateValue,
                    link: linkValue,
                    speaker: speakerValue,
                });
            }
    
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
        setTimeValue(stream.time)
        setSpeakerValue(stream.speaker);
        setLinkValue(stream.link);
        setIsPublic(stream.public);
        setUpdatedAudioFile(null);
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
              label="Sermon Title"
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
              label="Date (04/07/24)"
              description=""
              onChange={(e) => setNewDate(e.target.value)}
              />
              <Space h="md" />
            <TextInput
              placeholder="Speaker"
              label="John Dyck, Enrique Bartsch..."
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
            {/* <Checkbox
              label="PUBLIC / HIDDEN"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              description="Public for everyone / HIDDEN for everyone" /> */}

            <Space h="xl" />


            <Fragment>
  <Button
    size="lg"
    compact
    onClick={handleSubmit}
    disabled={!newStreamTitle || !newDate || loading}
    loading={loading}
  >
    Add Sermon
  </Button>
</Fragment>




          </Modal><Space h="xl" /><Group position="center">
            <Link href="/sermons/1">
          <Button>Sermons Page</Button>
          </Link>
            <Button onClick={() => setOpens(true)} >Add Sermon</Button>
          </Group><Space h="xl" />



          
          </>


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
                <input type="file" onChange={e => setUpdatedAudioFile(e.target.files[0])} />
                <Space h="xl" />
                <Progress value={uploadProgress} radius="xl" size="xl" label={uploadProgress} />
                <Space h="xl" />





                <Fragment>
                  <Button size="lg" compact onClick={updateStream}>
                    Update Live Stream
                  </Button>
                </Fragment>




              </Modal><Center>


                  </Center>

                  

                  
                  </></>
            ))}
        </div>

        <Center>
        <div className="scrollable-container">
  <Table verticalSpacing="xs" className='table-width-sermon-admin' striped fontSize="md" highlightOnHover  >
    <thead className="sermon-table-margin">
      <tr className="sermon-table-margin">
        <th>ID</th>
        <th>Title</th>
        <th>Date</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {streamList.map((stream) => (
        <tr key={stream.id}>
          <td>{stream.id}</td>
          <td>{stream.title}</td>
          <td>{stream.date}</td>
          <td>
          <Link href={`/admin/${stream.id}`}>
            <ActionIcon color="yellow" size="lg">
              <IconPencil size="1.125rem" />
            </ActionIcon>
          </Link>

          </td>
          <td>
            <ActionIcon color="red" size="lg" onClick={() => deleteMovie(stream.id)}>
              <IconTrashX size="1.125rem" />
            </ActionIcon>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
  </div>
</Center>

{streamList.length === 0 && (
            <Center>

    No Sermons available. Click the Add Sermon button to add one.

  </Center>
)}
        
        </>

            


            </Navbar>
            
        </div>
        
    )
            
}