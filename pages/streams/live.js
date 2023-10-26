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
        {/* Your existing Head content here */}
      </Head>
      <Space h="xl" />
      <Title fw={700} ta="center">LIVE STREAMS</Title>
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
      <Title fw={700} ta="center">Anstehende Streaming Veranstaltungen</Title>
      <Space h="xl" />
      {events.length === 0 ? (
        <Center><Text size="lg" className="textnoeventstreampage">Zurzeit sind keine Streaming-Veranstaltungen verfügbar. Wir bitten Sie, zu einem späteren Zeitpunkt erneut vorbeizuschauen.</Text></Center>
      ) : (
        <><Group position="center">
            {events.map((event) => (
              <Card
                key={event.id}
                radius="lg"
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  marginBottom: "20px",
                }}
              >
                <Text size="xl">{event.title}</Text>
                <Badge>{new Date(event.createdAt?.toDate()).toLocaleDateString()}</Badge>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button>
                    <Link href="/events">Mehr</Link>
                  </Button>
                </div>
              </Card>
              




            ))}
          </Group><Space h="xl" /></>
      )}
    </>
    
  );
}
