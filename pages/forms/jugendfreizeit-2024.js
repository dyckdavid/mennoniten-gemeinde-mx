import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { db } from "../../lib/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from '../../styles/MonthCalendar.module.css';
import Head from 'next/head'
import { Text, Space, Title, Center } from '@mantine/core';



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
                <title>Jugendfreizeit - Mennoniten Gemeinde</title>
                <meta name="description" content="Mennoniten Gemeinde" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/mennoniten-gemeinde-797ac.appspot.com/o/jugendfreizeiut.PNG?alt=media&token=f83c00b8-5213-45be-bf3f-2aac5ef408b7" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Space h="xl" />
            <Title fw={700} ta="center">Jugendfreizeit 2024</Title>
            <Space h="xl" />
            <Center>
            <iframe className='forms-iframe' src="https://docs.google.com/forms/d/e/1FAIpQLSeLE_S3gyUmYTP6v8AamWUmgeKSTcBegbqlP2RFTaTea33AcQ/viewform?embedded=true" width="640" height="974" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
            </Center>
            </div>
        </>
    );
}