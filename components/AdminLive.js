
import React from 'react';
import { Center } from '@mantine/core'
import { Space } from '@mantine/core';
import Head from 'next/head'
import Link from "next/link";
import { TextInput } from '@mantine/core';

import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { useState } from 'react';
import { Modal } from '@mantine/core';
import { Checkbox } from '@mantine/core';
import { Fragment, useContext } from 'react';
import { db } from '../firebase/config';
import firebase from "firebase/app";
import "firebase/database";


export const AdminLive = ({ stream }) => {
    const { url, Title, date, speaker, id } = stream;
    const [open, setOpen] = useState(false);
    const [titleValue, setTitleValue] = useState(Title);
    const [dateValue, setDateValue] = useState(date);
    const [urlValue, setUrlValue] = useState(url);
    const [speakerValue, setSpeakerValue] = useState(speaker);



    function updateStreamData(id, updatedData) {
        db.ref(`streams/${id}`).set(updatedData);
      }
      

    return (
        <><Modal
          opened={open}
          onClose={() => setOpen(false)}
          title="Edit Live Stream"
        >
          <TextInput
            placeholder="Title"
            label="Live Stream Title"
            description=""
            value={titleValue}
            onChange={(event) => setTitleValue(event.target.value)}
             />
          <Space h="md" />
          <TextInput
            placeholder="url"
            label=""
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
            description="Public for everyone / Private for admins only" />
  
          <Space h="xl" />


  
  
          <Fragment>
            <Button size="lg" compact>
              Update Live Stream
            </Button>
          </Fragment>

  
  
  
        </Modal><Center>
            <Card shadow="sm" p="lg" radius="md" withBorder className='admin-live-card'>
  
              <Card.Section>
                <h1 className='padding-text-live-admin'>{Title}</h1>
                <h2 className='padding-text-live-admin'>{speaker}</h2>
              </Card.Section>
  
              <Group position="apart" mt="md" mb="xs">
                <Text weight={505}>{url}</Text>
                <Badge color="red" variant="light" size="xl">
                  {date}
                </Badge>
              </Group>
  
  
              <div style={{ display: 'flex' }}>
                <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={() => setOpen(true)}>
                  EDIT
                </Button>
                <Space w="md" />
                <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                  DELETE
                </Button>
  
              </div>
            </Card>
          </Center></>
      );


}