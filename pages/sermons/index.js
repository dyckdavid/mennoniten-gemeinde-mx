import { useState } from 'react';
import { DateInput } from '@mantine/dates';
import { Text, Space, Card, Image, Badge, Button, Group, Title } from '@mantine/core';
import { useEffect} from "react";
import {db, auth, storage } from "../../lib/config";
import {
    getDocs,
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
} from "firebase/firestore";
import React from 'react';
import { Center } from '@mantine/core'
import Head from 'next/head'
import { TextInput } from '@mantine/core';
import { Modal } from '@mantine/core';
import { Checkbox } from '@mantine/core';
import { Fragment, useContext } from 'react';
import "firebase/database";
import { useCallback } from 'react';
import withAuth from '../admin/components/withAuth';
import Link from 'next/link'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Progress } from '@mantine/core';
import { FileInput, rem } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { Table } from '@mantine/core';
import { ActionIcon } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';
import { IconTrashX } from '@tabler/icons-react';
import { IconPencil } from '@tabler/icons-react';
import { deleteObject } from "firebase/storage";
import { getStorage } from "firebase/storage";
import firebase from "firebase/compat/app";
import { serverTimestamp } from "firebase/firestore";
import { query, orderBy } from 'firebase/firestore';
import NextLink from 'next/link'
import { IconCalendar } from '@tabler/icons';
import { Pagination } from '@mantine/core';


function SermonsPage() {
    return <div>Redirecting...</div>;
  }
  
  export async function getServerSideProps(context) {
    return {
      redirect: {
        destination: '/sermons/1',
        permanent: false,
      },
    }
  }
  
  export default SermonsPage;
  