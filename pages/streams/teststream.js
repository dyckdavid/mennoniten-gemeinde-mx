import { CardSection, Center } from '@mantine/core'
import { Text, Space, Card, Image, Badge, Button, Group, Title } from '@mantine/core';
import Head from 'next/head'
import { IconAccessPointOff } from '@tabler/icons-react';
import { IconAccessPoint } from '@tabler/icons-react';
import { IconUser } from '@tabler/icons-react';
import { IconCalendar } from '@tabler/icons-react';
import { useEffect, useState} from "react";
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
import { Fragment, useContext } from 'react';
import { useCallback } from 'react';
import Components from './components'
import StreamCard from './streamcard'
import Upcomingstream from './upcomingstream'



export default function Stream() {
  const [streamList, setStreamList] = useState([]);
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
  }, [streamCollectionRef]);

  useEffect(() => {
    getStreamList();
  }, [getStreamList]);

  return (
    <>
      c
      <Space h="xl" />
      <Title fw={700} ta="center">LIVE STREAMS</Title>
      {streamList.length === 0 ? (
        <Components />
      ) : (
        <>
          {streamList.map((stream) => (
            <div key={stream.id}>
              {stream.public ? (
                <StreamCard />
              ) : (
                <Upcomingstream />
              )}
            </div>
          ))}
        </>
      )}
    </>
  );
}
