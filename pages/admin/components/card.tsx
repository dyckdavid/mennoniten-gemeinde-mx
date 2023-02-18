import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { Center } from '@mantine/core';
import { Space } from '@mantine/core';

export default function Cards() {
    return (
        <Center>
      <Card shadow="sm" p="lg" radius="md" withBorder className='admin-live-card'>

        <Card.Section>
          <h1 className='padding-text-live-admin'>Gottes Dients</h1>
        </Card.Section>
  
        <Group position="apart" mt="md" mb="xs">
          <Text weight={505}>https://youtube.com/embed/8719Bg52635M6</Text>
          <Badge color="red" variant="light" size="xl">
            20/20/23
          </Badge>
        </Group>
  
        
  <div style={{ display: 'flex' }}>
        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
          EDIT STREAM
        </Button>
        <Space w="md" />
        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
          DELETE STREAM
        </Button>

        </div>
      </Card>
      </Center>
    );
  }