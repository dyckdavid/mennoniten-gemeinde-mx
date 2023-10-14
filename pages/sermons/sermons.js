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

