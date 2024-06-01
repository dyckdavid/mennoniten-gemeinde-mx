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
        fetchAvailableMonths(newYear);
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
            router.replace(`/monatzblat/?year=${year}&month=none`);
            return;
        }
      
        const months = querySnapshot.docs.map(doc => doc.data().month);
        setAvailableMonths(months);
        setIsLoading(false);
    };

    useEffect(() => {
        if (!noDataAvailable && selectedMonth) {
            fetchPdfUrl(selectedYear, selectedMonth);
        }
    }, [selectedYear, selectedMonth, noDataAvailable]);

    const fetchPdfUrl = async (year, month) => {
        setIsLoading(true);
        const monatzblatCollection = collection(db, "monatzblat");
        const q = query(monatzblatCollection, where("year", "==", year), where("month", "==", month));
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

    const handleMonthClick = (monthName) => {
        if (!availableMonths.includes(monthName)) {
            console.log("No data available for this month.");
            return; // Prevents action on months without data
        }
        setSelectedMonth(monthName);
        router.push(`/monatzblat/?year=${selectedYear}&month=${monthName}`);
        fetchPdfUrl(selectedYear, monthName);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const iframe = document.getElementById('myIframe');
            if (iframe) {
                iframe.onload = function () {
                    resizeIframe(iframe);
                };
            }
        }
    }, []);

    function resizeIframe(iframe) {
        iframe.style.height = iframe.contentWindow.document.documentElement.scrollHeight + 'px';
    }

    

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
                <div className={styles.months} key={selectedYear}>
    {Array.from({ length: 12 }).map((_, index) => {
        const monthName = new Date(0, index).toLocaleString('default', { month: 'long' });
        const isMonthAvailable = availableMonths.includes(monthName);
        return (
            <div key={monthName}
                className={`${styles.month} ${monthName === selectedMonth ? styles.selectedMonth : ''} ${isMonthAvailable ? styles.enabledMonth : styles.disabledMonth}`}
                onClick={() => isMonthAvailable && handleMonthClick(monthName)}>
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
                                <iframe src={pdfUrl} style={{ width: '100%', height: '100vh', overflow: 'hidden', border: 'none' }} title="Monthly PDF" className={styles.pdfIframe} scrolling="no"></iframe>
                                <br></br>
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
