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
import Components from '../streams/components'
import StreamCard from '../streams/streamcard'

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
  }, []);

  useEffect(() => {
    getStreamList();
  }, []);

  return (
    <>
      <Head>
        <title> Live - Mennoniten Gemeinde</title>
        <meta name="description" content="Mennoniten Gemeinde" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Space h="xl" />
      <Title fw={700} ta="center">Live Streams</Title>
      {streamList.length === 0 ? (
        <Components />
      ) : (
        <>
          {streamList.map((stream) => (
            <div key={stream.id}>
              {stream.public ? (
                <StreamCard />
              ) : (
                <Components />
              )}
            </div>
          ))}
        </>
      )}
    </>
  );
}
