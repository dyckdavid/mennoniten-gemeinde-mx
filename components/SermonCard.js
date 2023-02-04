import NextLink from 'next/link'
import { Card, Text, Badge, Button, Group } from '@mantine/core';
import { IconCalendar } from '@tabler/icons';
import React from 'react';


export const SermonsCard = ({ sermon }) => {
    const { name, title, date, speaker, id, audio, link } = sermon;
    return (
        <>

        <Card shadow="sm" p="lg" radius="md" withBorder className='card__predigten'>
      <Card.Section>

      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{title}</Text>
        <Badge color="red" variant="light" size="xl">
        <IconCalendar size={16} className="align-calendar"></IconCalendar>
          {date}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
{speaker}
      </Text>

      <NextLink passHref href={`/sermons/${id}`}>
      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
      Öffnen
      </Button>
      </NextLink>
    </Card>


        </>

    )
}
