import { useState, useEffect } from 'react';
import Head from 'next/head';
import { db } from '../../lib/config';
import { Card, Text } from '@mantine/core';
import { collection, getDocs } from 'firebase/firestore';

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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <style jsx global>{`
        .container {
          padding: 0 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          
        }

        .countdownCard {
          padding: 20px;
          border-radius: 10px;
          background-color: #f5f5f5;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        }

        .countdownText {
          font-size: 30px;
          font-weight: bold;
          color: red;
        }
      `}</style>

      <div className="container">
        <Card className="countdownCard">
          <Text size="xl" align="center" style={{ fontSize: '40px', fontWeight: 'bold', color: 'black' }}>
          Nächster Live-Stream
          </Text>
          <Text size="xl" align="center" className="countdownText">
            {countdown !== null ? ` ${days}d ${hours}h ${minutes}m ${seconds}s` : 'Loading...'}
          </Text>
        </Card>
      </div>
    </>
  );
}
