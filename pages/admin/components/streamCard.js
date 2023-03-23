import { useEffect, useState} from "react";
import {db, auth, storage } from "../../../lib/config";
import {
    getDocs,
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
    const [streamList, setStreamList] = useState([]);

    const [newStreamTitle, setNewStreamTitle] = useState("");
    const [newDate, setNewDate] = useState("");
    const [newSpeaker, setNewSpeaker] = useState("");
    const [isPublic, setIsPublic] = useState(false);

    const streamCollectionRef = collection(db, "streamslive");


    const getStreamList = async () => {
        try {
            const data = await getDocs(streamCollectionRef);
            const filterData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setStreamList(filterData);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getStreamList();
    }, []);

    return (
        <>
        <div>
            {streamList.map((stream) => (
                <div key={stream.id}>
                    <h1 style={{ color: stream.public ? "green" : "red" }}>{stream.Title}</h1>
                    <p>{stream.date}</p>
                </div>
            ))}
        </div>
        
        </>
    )
}


export default App;