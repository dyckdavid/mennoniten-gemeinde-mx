import { useRouter } from 'next/router';
import { useEffect, useState, useRef  } from 'react';
import { db } from '../../lib/config';
import { collection, getDocs, query, orderBy, startAfter, limit, doc } from 'firebase/firestore';
import { Card, Title, Text, Badge, Button, Group, Pagination } from '@mantine/core';
import { IconCalendar } from '@tabler/icons-react';
import Head from 'next/head';
import { title } from 'process';
import NextLink from 'next/link'
import { getDoc } from 'firebase/firestore';
import { Space, Center } from '@mantine/core';
import { Loader } from '@mantine/core';
import React from 'react';
import Paginations from './pagination'







export default function Sermon() {
  const [sermons, setSermons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { page: queryPage } = router.query;
console.log("Query Page:", queryPage);
const key = queryPage || 'initial';
  const [page, setPage] = useState(parseInt(queryPage, 10) || 1);
  const [loadingStates, setLoadingStates] = useState({});
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);



  useEffect(() => {
    setPage(parseInt(queryPage, 10) || 1);
}, [queryPage]);

console.log("Setting page state to:", parseInt(queryPage, 10) || 1);
console.log("Pagination current page prop:", parseInt(page, 10));



  useEffect(() => {
    const fetchTotalCount = async () => {
      const sermonsRef = collection(db, 'sermons');
      const sermonsSnapshot = await getDocs(sermonsRef);
      const totalCount = sermonsSnapshot.docs.length;
      setTotalPages(Math.ceil(totalCount / 18));
    };
    
    fetchTotalCount();
  }, []);
  


  


  const lastDoc = useRef({});

  useEffect(() => {
    const fetchSermons = async () => {
      setIsLoading(true);
      
      const fetchPage = async (startAfterDoc, pageSize) => {
        const sermonsRef = collection(db, "sermons");
        const queries = [orderBy("created", "desc"), limit(pageSize)];
        if (startAfterDoc) {
          queries.splice(1, 0, startAfter(startAfterDoc));
        }
        const q = query(sermonsRef, ...queries);
        return await getDocs(q);
      };
      
      let startAfterDoc = null;
      if (page > 1) {
        startAfterDoc = lastDoc.current[page - 1];
        if (!startAfterDoc) {
          // Fetch missing lastDocs
          let lastAvailablePage = 1;
          for (let i = page - 1; i >= 1; i--) {
            if (lastDoc.current[i]) {
              lastAvailablePage = i;
              break;
            }
          }
          const tempSnapshot = await fetchPage(lastDoc.current[lastAvailablePage], 18 * (page - lastAvailablePage));
          let lastDocIndex = 0;
          for (let i = lastAvailablePage + 1; i <= page; i++) {
            lastDoc.current[i] = tempSnapshot.docs[lastDocIndex];
            lastDocIndex += 18;
          }
          startAfterDoc = lastDoc.current[page - 1];
        }
      }
      
      const sermonsSnapshot = await fetchPage(startAfterDoc, 18);
      const newSermons = sermonsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      
      lastDoc.current[page] = sermonsSnapshot.docs[sermonsSnapshot.docs.length - 1];
      
      setSermons(newSermons);
      setIsLoading(false);
    };
    
    
          
    if (page !== undefined) {
      fetchSermons();
    }
  }, [page]);  // Reload when page changes

  const truncateTitle = (title, maxLength = 20) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  



  return (
    <>
    <div key={key}>
      <Head>
            <title> Sermons - Mennoniten Gemeinde</title>
        <meta name="description" content="Mennoniten Gemeinde" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

            </Head>
            <Space h="md" />
      <Center><Title fw={700} ta="center">PREDIGTEN</Title></Center>
      <Space h="md" />

      {isLoading && (
      <Center>
        <Loader size="xl" /> {/* Display spinner when data is being fetched */}
      </Center>
    )}

      {!isLoading && sermons.map((sermon) => (
        <Card key={sermon.id} shadow="sm" p="lg" radius="md" withBorder className="card__predigten">
          <Card.Section>

</Card.Section>


<Group position="apart" mt="md" mb="xs">
  <Text weight={600} size="xl" lineClamp={1} className="verticalText">{truncateTitle(sermon.title)}</Text>
  <Badge color="red" variant="light" size="xl">
  <IconCalendar size={16} className="align-calendar"></IconCalendar>
    {sermon.date}
  </Badge>
</Group>

<Text size="sm" color="dimmed">
{sermon.speaker}
</Text>

<NextLink passHref href={`../testsermon/${sermon.id}`}>
<Button 
    variant="light" 
    color="blue" 
    fullWidth 
    mt="md" 
    radius="md" 
    onClick={() => {
        setLoadingStates({...loadingStates, [sermon.id]: true});
    }}
    loading={loadingStates[sermon.id]}
>
    Öffnen
</Button>

</NextLink>
        </Card>
      ))}

{!isLoading && (
      <>
  {/* your other components */}
  <div style={{ 
    position: 'relative', 
    bottom: 0, 
    width: '100%', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: '.5rem 0',
    backgroundColor: '#fff' // change to match your page's background color
  }}>
    <Paginations
      currentPage={parseInt(page, 10)}
      totalPages={totalPages}
      onPageChange={(newPage) => {
        router.push(`/sermons/${newPage}`);
      }}
    />

    
  </div>
  

</>
)}
</div>
    </>
  );
}