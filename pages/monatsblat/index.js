import { CardSection, Center } from '@mantine/core'
import { Text, Space, Card, Image, Badge, Button, Group, Title } from '@mantine/core';
import Head from 'next/head'
import { IconAccessPointOff } from '@tabler/icons-react';
import { IconAccessPoint } from '@tabler/icons-react';
import { IconUser } from '@tabler/icons-react';
import { IconCalendar } from '@tabler/icons-react';
import { useEffect, useState} from "react";
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
import { Fragment, useContext } from 'react';
import { useCallback } from 'react';
import Components from '../streams/components'
import StreamCard from '../streams/streamcard'
import { useRouter } from 'next/router';
import styles from '../../styles/MonthCalendar.module.css';

export default function Monatzblat() {
    const router = useRouter();
    const { year, month } = router.query;
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(month || new Date().toLocaleString('default', { month: 'long' }));

    useEffect(() => {
        if (year) setSelectedYear(parseInt(year));
        if (month) setSelectedMonth(month);
    }, [year, month]);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleMonthClick = (month) => {
        setSelectedMonth(month);
        router.push(`/monatsblat/?year=${selectedYear}&month=${month}`, undefined, { shallow: true });
    };

    const handleYearChange = (event) => {
        const newYear = event.target.value;
        setSelectedYear(newYear);
        router.push(`/monatsblat/?year=${newYear}&month=${selectedMonth}`, undefined, { shallow: true });
    };

    return (
        <>
        <Head>
        <title> Monatzblat - Mennoniten Gemeinde</title>
        <meta name="description" content="Mennoniten Gemeinde" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <Space h="xl" />
        <Title fw={700} ta="center">Monatsblat</Title>
        <Space h="xl" />
        <div className={styles.calendar}>
            <select value={selectedYear} onChange={handleYearChange} className={styles.yearSelector}>
                {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - 10 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
            <div className={styles.months}>
                {months.map((monthName) => (
                    <div
                        key={monthName}
                        className={`${styles.month} ${monthName === selectedMonth ? styles.selectedMonth : ''}`}
                        onClick={() => handleMonthClick(monthName)}
                    >
                        {monthName}
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}