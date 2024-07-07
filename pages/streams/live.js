import {
  CardSection,
  Center,
  Text,
  Space,
  Card,
  Image,
  Badge,
  Button,
  Group,
  Title,
} from "@mantine/core";
import Head from "next/head";
import { useEffect, useState, useCallback } from "react";
import { db, auth, storage } from "../../lib/config";
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc, query, orderBy } from "firebase/firestore";
import React from "react";
import Link from 'next/link';
import Components from "./components";
import StreamCard from "./streamcard";
import Upcomingstream from "./upcomingstream";

export default function Stream() {
  const [streamList, setStreamList] = useState([]);
  const streamCollectionRef = collection(db, "streamslive");

  const [events, setEvents] = useState([]);
  const eventsCollectionRef = collection(db, "events");

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

  const getEvents = useCallback(async () => {
    const now = new Date();
    const q = query(eventsCollectionRef, orderBy("createdAt"));
    const data = await getDocs(q);
    const filteredEvents = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })).filter((event) => {
      const eventDate = new Date(event.createdAt?.toDate());
      return event.stream === true && eventDate > now;
    });
    setEvents(filteredEvents);
  }, [eventsCollectionRef]);

  useEffect(() => {
    getStreamList();
  }, [getStreamList]);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return (
    <>
      <Head>
        <title> Live - Mennoniten Gemeinde</title>
        <meta name="description" content="Mennoniten Gemeinde" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Live Stream : Mennoniten Gemeinde" />
  <meta property="og:description" content="Mennoniten Gemeinde live stream" />
  <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/mennoniten-gemeinde-797ac.appspot.com/o/km5%20(1).jpg?alt=media&token=55c257d7-449c-4914-a420-ff11f77f0c00&_gl=1*qn63t0*_ga*NDcwMDk1ODE2LjE2OTgzMzkyMjE.*_ga_CW55HF8NVT*MTY5ODcwNzM1OS43LjEuMTY5ODcwNzM3Mi40Ny4wLjA." />
  <meta property="og:url" content="https://mennonitengemeinde.mx/streams/live" />
      </Head>
      <Space h="xl" />
      <Title fw={700} ta="center">LIVE STREAMS</Title>
      <Space h="xl" />
      {streamList.length === 0 ? (
        <Components />
      ) : (
        <>
          {streamList.map((stream) => (
            <div key={stream.id}>
              {stream.public ? <StreamCard /> : <Upcomingstream />}
            </div>
          ))}
        </>
      )}

      {/* New Section for Upcoming Streams */}
      <Space h="xl" />
      <Title fw={700} ta="center">Streaming Veranstaltungen</Title>
      <Space h="xl" />
      {events.length === 0 ? (
        <Center><Text size="lg" className="textnoeventstreampage">Zurzeit sind keine Streaming-Veranstaltungen verfügbar. Wir bitten Sie, zu einem späteren Zeitpunkt erneut vorbeizuschauen.</Text></Center>
      ) : (
        <>
          <Group position="center">
            {events.map((event) => {
              const eventTime = new Date(event.createdAt?.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

              return (
                <Card
                  key={event.id}
                  radius="lg"
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    marginBottom: "20px",
                  }}
                >
                  <Group position="apart" style={{ marginBottom: 10, alignItems: 'center' }}>
                    <Text size="xl">{event.title}</Text>
                    <Text size="xl" color="red">
                      {eventTime}
                    </Text>
                  </Group>
                  <Badge>{new Date(event.createdAt?.toDate()).toLocaleDateString()}</Badge>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button>
                      <Link href="/events">Mehr</Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </Group>
          <Space h="xl" />
        </>
      )}
    </>
    
  );
}
