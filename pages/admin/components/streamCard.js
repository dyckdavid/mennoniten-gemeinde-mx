import { useEffect, useState} from "react";
import {db, auth, storage } from "../../../lib/config";
import {
    getDocs,
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import Link from 'next/link'
import React from 'react';
import { Center } from '@mantine/core'
import { Space } from '@mantine/core';
import Head from 'next/head'
import { TextInput } from '@mantine/core';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { Modal } from '@mantine/core';
import { Checkbox } from '@mantine/core';
import { Fragment, useContext } from 'react';
import firebase from "firebase/app";
import "firebase/database";
import { useCallback } from 'react';





function App() {
    const [streamList, setStreamList] = useState([]);

    const [newStreamTitle, setNewStreamTitle] = useState("");
    const [newDate, setNewDate] = useState("");
    const [newSpeaker, setNewSpeaker] = useState("");
    const [isNewPublic, setIsNewPublic] = useState();
    const [isPublic, setIsPublic] = useState(false);
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);
    const [titleValue, setTitleValue] = useState();
    const [dateValue, setDateValue] = useState();
    const [urlValue, setUrlValue] = useState("");
    const [speakerValue, setSpeakerValue] = useState();
    const [currentStream, setCurrentStream] = useState(null);


    const handleChange = async (stream) => {
      const newValue = !stream.public;
      // Update the value in Firestore
      const streamDoc = doc(db, "streamslive", stream.id);
      await updateDoc(streamDoc, { public: newValue });
      // Update the state
      const updatedStreamList = streamList.map((item) =>
        item.id === stream.id ? { ...item, public: newValue } : item
      );
      setStreamList(updatedStreamList);
    };
    


    const [updatedTitle, setUpdatedTitle] = useState("");

    const streamCollectionRef = collection(db, "streamslive");


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
  }, [getStreamList]);


      const handleSuccess = () => {
        setOpens(false); // Close the popup
        getStreamList(); // Refresh the movie list
      };
      
      const handleSubmit = () => {
        onSubmitMovie()
          .then(handleSuccess)
          .catch((error) => console.error("Error uploading the live stream:", error));
      };
      


      const onSubmitMovie = () => {
        return new Promise(async (resolve, reject) => {
          try {
            await addDoc(streamCollectionRef, {
              Title: newStreamTitle,
              date: newDate,
              public: isPublic,
              url: urlValue,
              speaker: speakerValue,
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
        const streamDoc = doc(db, "streamslive", id);
        await deleteDoc(streamDoc);
      
        // Update the state after successful deletion
        const updatedStreamList = streamList.filter((stream) => stream.id !== id);
        setStreamList(updatedStreamList);
      };
      

      const updateStream = async () => {
        try {
          const streamDoc = doc(db, "streamslive", currentStream.id);
          await updateDoc(streamDoc, {
            Title: titleValue,
            date: dateValue,
            url: urlValue,
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
        setTitleValue(stream.Title);
        setDateValue(stream.date);
        setSpeakerValue(stream.speaker);
        setUrlValue(stream.url);
        setIsPublic(stream.public);
        setOpen(true);
      };


    return (
        <>
        <><Head>
          <title>admin - Live stream</title>
        </Head>
        
        <Modal
          opened={opens}
          onClose={() => setOpens(false)}
          title="Add Live Stream"
        >
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
              onChange={(e) => setUrlValue(e.target.value)}
              description=""
              withAsterisk />
            <Space h="md" />
            <TextInput
              placeholder="Date"
              label="Date"
              description=""
              onChange={(e) => setNewDate(e.target.value)}
              withAsterisk />
              <Space h="md" />
            <TextInput
              placeholder="Speaker"
              label="Speaker"
              description=""
              onChange={(e) => setNewSpeaker(e.target.value)}
              withAsterisk />
            <Space h="md" />
            <Checkbox
              label="PUBLIC / PRIVATE"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              description="Public for everyone / Private for admins only!" />

            <Space h="xl" />


            <Fragment>
              <Button size="lg" compact onClick={handleSubmit}>
                Add Live Streaming
              </Button>
            </Fragment>



          </Modal><Space h="xl" /><Group position="center">
            <Button onClick={() => setOpens(true)} disabled={streamList.length > 0}>Add Live Stream</Button>
          </Group><Space h="xl" />

          
          </>

          {streamList.length === 0 && (
            <Center>

    No Stream available. Click the Add Live Stream button to add one.

  </Center>
)}
        <div>
        
            {streamList.map((stream) => (
                <><div key={stream.id}>
               


              </div><><Modal
                opened={open}
                onClose={() => setOpen(false)}
                title="Edit Live Stream"
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
                  value={urlValue}
                  onChange={(event) => setUrlValue(event.target.value)}
                  withAsterisk />
                <Space h="md" />
                <TextInput
                  placeholder="speaker"
                  label=""
                  description=""
                  value={speakerValue}
                  onChange={(event) => setSpeakerValue(event.target.value)}
                  withAsterisk />
                <Space h="md" />
                <TextInput
                  placeholder="date"
                  label=""
                  description=""
                  value={dateValue}
                  onChange={(event) => setDateValue(event.target.value)}
                  withAsterisk />
                <Space h="md" />
                <Checkbox
                  label="PUBLIC / PRIVATE"
                  checked={stream.public}
                  onChange={() => handleChange(stream)}
                  description="Public for everyone / Private for admins only" />


                <Space h="xl" />




                <Fragment>
                  <Button size="lg" compact onClick={updateStream}>
                    Update Live Stream
                  </Button>
                </Fragment>




              </Modal><Center>
                    <Card shadow="sm" p="lg" radius="md" withBorder className='admin-live-card'>

                      <Card.Section>
                        <h1 className='padding-text-live-admin' style={{ color: stream.public ? 'green' : 'red' }}>{stream.Title}</h1>
                        <h2 className='padding-text-live-admin'>{stream.speaker}</h2>
                      </Card.Section>

                      <Group position="apart" mt="md" mb="xs">
                        <Text weight={505}>{stream.url}</Text>
                        <Badge color="red" variant="light" size="xl">
                          {stream.date}
                        </Badge>
                      </Group>
                      <Checkbox
              label="Public or Private"
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

                    
                  </Center></></>
            ))}
        </div>
        
        </>
    )
}


export default App;