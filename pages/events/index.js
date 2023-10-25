import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Center, Title, Text, Timeline } from '@mantine/core';
import { db } from "../../lib/config"; 
import { getDocs, query, collection, orderBy } from "firebase/firestore";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      
      const eventsRef = collection(db, "events");
      const q = query(eventsRef, orderBy("createdAt", "desc"));
      
      const querySnapshot = await getDocs(q);
      const eventsArray = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      }).reverse();
      
      setEvents(eventsArray);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const today = new Date().setHours(0, 0, 0, 0);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Veranstaltungen - Mennoniten Gemeinde</title>
        <meta name="description" content="Mennoniten Gemeinde" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <Center>
          <Title fw={700} ta="center">Veranstaltungen</Title>
        </Center>
      </div>
      <Center>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Timeline bulletSize={50} lineWidth={4}>
            {events.length === 0 ? (
              <Text>No events</Text>
            ) : (
              events.map((event, index) => {
                const isActive = new Date(event.createdAt?.toDate()).setHours(0, 0, 0, 0) === today;
                return (
<Timeline.Item
  key={index}
  active={isActive ? index + 1 : null}
  bullet={<div>{new Date(event.createdAt?.toDate()).getDate()}</div>}
>
  <div style={{ marginLeft: '20px' }}> {/* Add this line */}
    <Text size="xl">{event.title}</Text>
    <Text size="xl" c="blue" mt={10}>
      {new Date(event.createdAt?.toDate()).toLocaleDateString()}
    </Text>
    <Text size="md" mt={4}>Prediger: {event.speaker}</Text>
  </div> {/* And this line */}
</Timeline.Item>

                )
              })
            )}
          </Timeline>
        )}
      </Center>
    </>
  );
}