/* eslint-disable react/jsx-key */
import { collection, DocumentData, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/clientApp';


function Details(id: string) {
    const [data, setData] = useState<DocumentData>([]);

    useEffect(() => {
        getDocs(collection(db, "sermons")).then((querySnapshot) => {
            const items = querySnapshot.docs.map((doc) => doc.data());
            setData(items);
        });
    }, []);
    
    if (data.length === 0) {
        return <p>Loading...</p>;
    }



    return (
        <>
        {data.map((item: DocumentData) => (
        <div key={id}>
            
            <h1>{item.title}</h1>
            
        </div>
        ))}
        </>
    )
}

export default Details;


