import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../../lib/config';
import { collection, getDocs, query, orderBy, startAfter, limit, doc } from 'firebase/firestore';
import { Card, Title, Text, Badge, Button, Group, Pagination } from '@mantine/core';
import { IconCalendar } from '@tabler/icons-react';
import Head from 'next/head';
import { title } from 'process';
import NextLink from 'next/link'
import { getDoc } from 'firebase/firestore';
import { Space, Center } from '@mantine/core';






export default function Sermon() {
  const [sermons, setSermons] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);  // state for last document snapshot
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { page: queryPage } = router.query; // Getting page from query parameter
  const [page, setPage] = useState(parseInt(queryPage, 10) || 1);
  const [loadingStates, setLoadingStates] = useState({});
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);



  useEffect(() => {
    setPage(parseInt(queryPage, 10) || 1);
  }, [queryPage]);

  useEffect(() => {
    const fetchTotalCount = async () => {
      const sermonsRef = collection(db, 'sermons');
      const sermonsSnapshot = await getDocs(sermonsRef);
      const totalCount = sermonsSnapshot.docs.length;
      setTotalPages(Math.ceil(totalCount / 18));
    };
    
    fetchTotalCount();
  }, []);
  


  


  // Other parts of your code remain unchanged

  useEffect(() => {
    const fetchSermons = async () => {
      setIsLoading(true);
  
      // Fetch all documents up to the current page
      const sermonsRef = collection(db, "sermons");
      const q = query(sermonsRef, orderBy("created", "desc"), limit(18 * page));
        
      const sermonsSnapshot = await getDocs(q);
      const allSermons = sermonsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
      // Slice the required page
      const startIndex = (page - 1) * 18;
      const newSermons = allSermons.slice(startIndex, startIndex + 18);
  
      setSermons(newSermons);
      setIsLoading(false);
    };
        
    if (page !== undefined) {
      fetchSermons();
    }
  }, [page]); // Reload when page changes
  



  return (
    <>
      <Head>
            <title> Sermons - Mennoniten Gemeinde</title>
        <meta name="description" content="Mennoniten Gemeinde" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

            </Head>
            <Space h="md" />
      <Center><Title fw={700} ta="center">PREDIGTEN</Title></Center>
      <Space h="md" />
      {sermons.map((sermon) => (
        <Card key={sermon.id} shadow="sm" p="lg" radius="md" withBorder className="card__predigten">
          <Card.Section>

</Card.Section>

<Group position="apart" mt="md" mb="xs">
  <Text weight={600} size="xl" lineClamp={1} className="verticalText">{sermon.title}</Text>
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
    <Pagination 
      total={totalPages}
      size="md" 
      radius="md" 
      currentPage={parseInt(page, 10)} 
      onChange={page => router.replace(`/sermons/${page}`)} 
    />
    
  </div>
</>
    </>
  );
}
