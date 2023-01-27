/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetStaticPropsContext,
    NextPage,
  } from "next";
  import { useRouter } from "next/router";
  import { useContext, useEffect } from "react";
  import {
    doc,
    DocumentData,
    getDoc,
    getDocs,
    collection,
  } from "firebase/firestore";
import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { Center } from '@mantine/core'
import { Image } from '@mantine/core';
import Link from 'next/link'
import { Card, Text, Badge, Button, Group } from '@mantine/core';
import { SimpleGrid } from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import { MediaQuery } from '@mantine/core';
import { IconCalendar } from '@tabler/icons';
import { Space } from '@mantine/core';
import { db } from '../../firebase/clientApp';
import { useState } from 'react';
import { Table } from '@mantine/core';
import { createStyles } from '@mantine/core';
import { Loader } from '@mantine/core';
import '@firebase/firestore';
import 'firebase/firestore';
import 'firebase/firestore'
import 'firebase/firestore'
import firebase from 'firebase/compat/app'
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from "node:querystring";
import { Props } from "next/dist/client/script";
import { title } from "process";



  
  export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
  ) => {
    const id = (context.params as ParsedUrlQuery).id as string;
    const docRef = doc(db, "sermons", id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    
  
    return {
      props: {
        data,
      },
    };

    
  };
  


