import { useState, useEffect } from 'react';
import Head from 'next/head';
import { db } from '../../lib/config';
import { Card, Text } from '@mantine/core';
import { collection, getDocs } from 'firebase/firestore';

export default function UpcomingStream() {
  // ... (your existing useEffects and variable declarations)
  


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

        {/* Any content you previously had in the Head component */}
        
      </Head>

      <style jsx global>{`


        .container {
          padding: 0 10px;
        }

        .countdownText {
          font-size: 20px; 
          white-space: nowrap;
        }

        @media (min-width: 601px) {
          @media (min-width: 601px) {
            .imageCard {
              width: 250px;
              height: 150px;
              margin: 20px auto;
            }
          }
          
          
        }
      `}</style>

      <div className="container">
        <Card className="imageCard" style={{ 
          width: '100%', 
          height: 'auto', 
          margin: '20px auto', 
          backgroundColor: '#fff',
          position: 'relative', 
          borderRadius: '10px' 
        }}>
          <div style={{
            width: '100%',
            paddingTop: '66.66%', 
            position: 'relative',
            backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/mennoniten-gemeinde-797ac.appspot.com/o/images%2Fjake%20wedding-min.jpg?alt=media&token=acefc338-87a8-400f-84ac-ef2e2fef0c90')", 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat', 
            opacity: '0.7'
          }}>
            <Text 
              size="xl" 
              align="center" 
              style={{ 
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '30px', 
                fontWeight: 'bold', 
                color: 'white' 
              }}
            >
              Hochzeit Jake & Maria
            </Text>

            <Text 
              size="xl" 
              align="center" 
              className="countdownText"
              style={{ 
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontWeight: 'bold', 
                color: 'red' 
              }}
            >
              {countdown !== null 
                ? `Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s` 
                : 'Loading...'}
            </Text>
          </div>
        </Card>
      </div>
    </>
  );
}
