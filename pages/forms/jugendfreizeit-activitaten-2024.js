import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { db } from "../../lib/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from '../../styles/MonthCalendar.module.css';
import Head from 'next/head'
import { Text, Space, Title, Center } from '@mantine/core';
import Image from "next/image";



export default function Jugendfreizeit() {
    useEffect(() => {
        // Add the 'adminPage' class to the body when this component mounts
        document.body.classList.add('adminPage');

        // Remove the 'adminPage' class from the body when this component unmounts
        return () => {
            document.body.classList.remove('adminPage');
        };
    }, []);

    return(
        <>
        <div className={styles.noBackground}>
            <Head >
                <title>Jugendfreizeit-Aktivitäten - Mennoniten Gemeinde</title>
                <meta name="description" content="Mennoniten Gemeinde" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Space h="xl" />
            <Title fw={700} ta="center">Forms</Title>
            <Space h="xl" />
            <Center>
            {/* <iframe className='forms-iframe' src="" width="640" height="974" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe> */}
            <p>No forms found!</p>
            </Center>
            </div>
        </>
    );
}