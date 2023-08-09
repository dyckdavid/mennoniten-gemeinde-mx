import { useState, useEffect } from 'react';
import Head from 'next/head';
import { db } from '../../lib/config'; // Import the db instance from your config file
import { Card, Text } from '@mantine/core';
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions

export default function UpcomingStream() {
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const docSnap = await getDocs(collection(db, 'streamslive'));
      
      if (!docSnap.empty) {
        const dateTimeString = `${docSnap.docs[0].data().date} ${docSnap.docs[0].data().time}`;
        const endDate = new Date(dateTimeString).getTime();
        const now = Date.now();

        if (endDate > now) {
          const diffTime = Math.abs(endDate - now);
          setCountdown(diffTime);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 1000) {
          return prevCountdown - 1000;
        } else {
          clearInterval(timerId);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [countdown]);

  const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
  const hours = Math.floor((countdown / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((countdown / 1000 / 60) % 60);
  const seconds = Math.floor((countdown / 1000) % 60);

  return (
    <>
      <Head>
       
      </Head>
      <Card style={{ 
  maxWidth: '600px', 
  height: '400px', 
  margin: 'auto', 
  backgroundColor: '#fff', 
  backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/mennoniten-gemeinde-797ac.appspot.com/o/images%2Fkm5church-min.png?alt=media&token=c273bd55-23cb-4036-a7ff-294cf8bddcf8')", 
  backgroundSize: 'cover', 
  backgroundPosition: 'center', 
  display: 'flex', 
  flexDirection: 'column', 
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px' 
}}>

        <Text 
  size="xl" 
  align="center" 
  style={{ fontSize: '40px', fontWeight: 'bold', color: 'red' }}
>
  {countdown !== null 
    ? `Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s` 
    : 'Loading...'}
</Text>

      </Card>
    </>
  );
}
