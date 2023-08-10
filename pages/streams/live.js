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
        <meta property="og:title" content="Live Stream : Mennoniten Gemeinde" />
  <meta property="og:description" content="Mennoniten Gemeinde Designed and developed by David Dyck" />
  <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/mennoniten-gemeinde-797ac.appspot.com/o/images%2Fjake%20wedding-min.jpg?alt=media&token=acefc338-87a8-400f-84ac-ef2e2fef0c90" />
  <meta property="og:url" content="https://mennonitengemeinde.mx/streams/live" />
      </Head>
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
