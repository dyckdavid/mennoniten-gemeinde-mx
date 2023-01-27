import { useState, useEffect } from 'react'
import { db } from '../lib/firebase'
import 'firebase/firestore';
import firebase from 'firebase/compat/app'


interface Sermon{
    id:string,
    title:string,
    speaker:string
}

const Sermons = () => {
    const [sermons, setSermons] = useState<Sermon[]>([])
    var db = firebase.firestore();
    

    useEffect(() => {
        const unsubscribe = db
        .collection('sermons')
        .onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                title: doc.data().title,
                speaker: doc.data().speaker
            }))
        })

        return () => unsubscribe()
    }, [db])

    return (
        <div>
            {sermons.map((sermon) => (
            <div key={sermon.id}>
                <h2>{sermon.title}</h2>
                <p>{sermon.speaker}</p>
            </div>
            ))}
        </div>
    )
}

export default Sermons