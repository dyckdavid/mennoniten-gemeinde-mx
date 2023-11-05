import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Center, Title, Text, Timeline, Paper, Space } from '@mantine/core';
import { db } from "../../lib/config";
import { getDocs, query, collection, orderBy } from "firebase/firestore";
import { IconCalendarStats } from '@tabler/icons-react';
import styles from './styles.module.css';

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
        // Convert the Firestore timestamp to a JavaScript Date object
        const dateObject = doc.data().createdAt?.toDate();
        // Format the date and time with a hyphen '-'
        const formattedDate = dateObject.toLocaleDateString();
        const formattedTime = dateObject.getHours().toString().padStart(2, '0') + ':' + dateObject.getMinutes().toString().padStart(2, '0');
        const dateTimeString = `${formattedDate} - ${formattedTime}`;

        // Return the event object with the new dateTimeString property
        return {
          id: doc.id,
          ...doc.data(),
          dateTimeString, // Add this property with the formatted date-time string
        };
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
      <Center>
            <Title fw={700}>Veranstaltungen</Title>
          </Center>
          <Space h="xl" />
      <div className={styles.container1}>
        <div className={styles.iconWrapper}>
          <IconCalendarStats size={150} />
        </div>
        <div className={styles.contentWrapper}>
          
          <Space h="xl" />
          {loading ? (
            <Center>Loading...</Center>
          ) : events.length === 0 ? (
            <Text>No events</Text>
          ) : (
            <Paper padding="md" radius="xl" style={{ width: '100%', backgroundColor: 'white', padding: '20px' }}>
              <Timeline bulletSize={50} lineWidth={4} style={{ width: '100%' }}>
                {events.map((event, index) => {
                  const isActive = new Date(event.createdAt?.toDate()).setHours(0, 0, 0, 0) === today;
                  return (
                    <Timeline.Item
                      key={index}
                      active={isActive ? index + 1 : null}
                      bullet={<div>{new Date(event.createdAt?.toDate()).getDate()}</div>}
                    >
                      <div style={{ marginLeft: '20px' }}>
                        <Text size="xl">{event.title}</Text>
                        <Text size="xl" color="blue" mt={10}>
                          {event.dateTimeString} {/* Use the formatted dateTimeString here */}
                        </Text>
                        <Text size="md" mt={4}>{event.speaker}</Text>
                      </div>
                    </Timeline.Item>
                  );
                })}
              </Timeline>
            </Paper>
          )}
          <Space h="xl" />
        </div>
      </div>
    </>
  );
}
