import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { db } from "../../lib/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from '../../styles/MonthCalendar.module.css';
import Head from 'next/head';
import { Text, Space, Card, Image, Badge, Button, Group, Title, Center } from '@mantine/core';


export default function Monatzblat() {
    const router = useRouter();
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [pdfUrl, setPdfUrl] = useState('');
    const [availableMonths, setAvailableMonths] = useState([]);
    const [noDataAvailable, setNoDataAvailable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (router.isReady) {
            const queryYear = router.query.year || new Date().getFullYear().toString();
            const queryMonth = router.query.month || new Date().toLocaleString('default', { month: 'long' });
            setSelectedYear(queryYear);
            setSelectedMonth(queryMonth);
            fetchAvailableMonths(queryYear);
        }
    }, [router.isReady, router.query.year, router.query.month]);

    const handleYearChange = (event) => {
        const newYear = event.target.value;
        setSelectedYear(newYear);
        const newMonth = availableMonths.length > 0 ? availableMonths[0] : new Date().toLocaleString('default', { month: 'long' });
        router.push(`/monatsblat/?year=${newYear}&month=${newMonth}`);
    };

    const fetchAvailableMonths = async (year) => {
        setIsLoading(true);
        const monatzblatCollection = collection(db, "monatzblat");
        const q = query(monatzblatCollection, where("year", "==", year));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            setAvailableMonths([]);
            setNoDataAvailable(true);
            setPdfUrl('');
            setIsLoading(false);
            router.replace(`/monatsblat/?year=${year}&month=none`);
            return;
        }
    
        const months = querySnapshot.docs.map(doc => doc.data().title); // Correct definition and use
        setAvailableMonths(months);
        setNoDataAvailable(false);
    
        const currentMonth = new Date().toLocaleString('default', { month: 'long' });
        if (!months.includes(selectedMonth) || !queryMonth) {
            const recentAvailableMonth = months.sort((a, b) => new Date(year, months.indexOf(b)) - new Date(year, months.indexOf(a)))[0];
            setSelectedMonth(recentAvailableMonth || currentMonth);
            router.replace(`/monatsblat/?year=${year}&month=${recentAvailableMonth || currentMonth}`);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (!noDataAvailable && selectedMonth) {
            fetchPdfUrl(selectedYear, selectedMonth);
        }
    }, [selectedYear, selectedMonth, availableMonths]);

    const fetchPdfUrl = async (year, month) => {
        setIsLoading(true);
        if (!availableMonths.includes(month)) {
            setPdfUrl('');
            setIsLoading(false);
            return;
        }
        const monatzblatCollection = collection(db, "monatzblat");
        const q = query(monatzblatCollection, where("year", "==", year), where("title", "==", month));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const docData = querySnapshot.docs[0].data();
            setPdfUrl(docData.pdf);
        } else {
            console.log("No matching documents.");
            setPdfUrl('');
        }
        setIsLoading(false);
    };


    return (
        <>
            <Head>
                <title>Monatzblat - Mennoniten Gemeinde</title>
                <meta name="description" content="Mennoniten Gemeinde" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.calendar}>
                <select value={selectedYear} onChange={handleYearChange} className={styles.yearSelector}>
                    {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - 10 + i).map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                <div className={styles.months}>
                    {Array.from({ length: 12 }).map((_, index) => {
                        const monthName = new Date(0, index).toLocaleString('default', { month: 'long' });
                        return (
                            <div key={monthName}
                                className={`${styles.month} ${monthName === selectedMonth ? styles.selectedMonth : ''} ${!availableMonths.includes(monthName) ? styles.disabledMonth : ''}`}
                                onClick={() => handleMonthClick(monthName)}>
                                {monthName}
                            </div>
                        );
                    })}
                </div>
            </div>
            {noDataAvailable ? (
                <p>No Monatzblat found for the selected year and month. Please select a different month or year.</p>
            ) : (
                <div className={styles.container}>
                    {pdfUrl && (
                        <>
                        <Center>
                            <a href={pdfUrl} download={`${selectedMonth}-${selectedYear}-Monatzblat.pdf`}>
                                <button type="button" className={styles.downloadButton}>Download PDF</button>
                            </a>
                            </Center>
                            <Center>
                            <div className={styles.iframeContainer}>
                                <iframe src={pdfUrl} title="Monthly PDF" className={styles.pdfIframe}></iframe>
                            </div>
                            </Center>
                        </>
                    )}
                    {isLoading && <p>Loading...</p>}
                </div>
            )}
        </>
    );
}
