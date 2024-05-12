import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { db } from "../../lib/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from '../../styles/MonthCalendar.module.css';
import Head from 'next/head'


export default function Monatzblat() {
    const router = useRouter();
    const queryYear = router.query.year;
    const queryMonth = router.query.month;
    const [selectedYear, setSelectedYear] = useState(queryYear || new Date().getFullYear().toString());
    const [selectedMonth, setSelectedMonth] = useState(queryMonth || new Date().toLocaleString('default', { month: 'long' }));
    const [pdfUrl, setPdfUrl] = useState('');
    const [availableMonths, setAvailableMonths] = useState([]);

    useEffect(() => {
        const fetchAvailableMonths = async (year) => {
            const monatzblatCollection = collection(db, "monatzblat");
            const q = query(monatzblatCollection, where("year", "==", year));
            const querySnapshot = await getDocs(q);
            const months = querySnapshot.docs.map(doc => doc.data().title);
            setAvailableMonths(months);

            if (!months.includes(selectedMonth) || !queryMonth) {
                // Find the most recent month available or use the current month if none found
                const sortedMonths = months.sort((a, b) => new Date(year, months.indexOf(b)) - new Date(year, months.indexOf(a)));
                const recentAvailableMonth = sortedMonths.find(m => new Date(year, months.indexOf(m)).getTime() <= new Date().getTime());
                setSelectedMonth(recentAvailableMonth || new Date().toLocaleString('default', { month: 'long' }));
                router.replace(`/monatsblat/?year=${year}&month=${recentAvailableMonth || selectedMonth}`);
            }
        };

        fetchAvailableMonths(selectedYear);
    }, [selectedYear, router]);

    useEffect(() => {
        const fetchPdfUrl = async (year, month) => {
            if (!availableMonths.includes(month)) {
                setPdfUrl('');
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
        };

        if (selectedMonth) {
            fetchPdfUrl(selectedYear, selectedMonth);
        }
    }, [selectedYear, selectedMonth, availableMonths]);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleMonthClick = (monthName) => {
        if (new Date(selectedYear, months.indexOf(monthName)).getTime() > new Date().getTime() || !availableMonths.includes(monthName)) {
            return;
        }
        setSelectedMonth(monthName);
        router.push(`/monatsblat/?year=${selectedYear}&month=${monthName}`);
    };

    const handleYearChange = (event) => {
        const newYear = event.target.value;
        setSelectedYear(newYear);
        router.push(`/monatsblat/?year=${newYear}&month=${selectedMonth}`);
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
                    {months.map((monthName, index) => (
                        <div key={monthName}
                             className={`${styles.month} ${monthName === selectedMonth ? styles.selectedMonth : ''} ${!availableMonths.includes(monthName) || new Date(selectedYear, index).getTime() > new Date().getTime() ? styles.disabledMonth : ''}`}
                             onClick={() => handleMonthClick(monthName)}>
                            {monthName}
                        </div>
                    ))}
                </div>
            </div>
            {pdfUrl && (
                <iframe src={pdfUrl} style={{ width: '100%', height: '500px', border: 'none', marginTop: '20px' }} title="Monthly PDF"></iframe>
            )}
        </>
    );
}
