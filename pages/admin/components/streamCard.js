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
import Link from 'next/link'


function App() {
    const [streamList, setStreamList] = useState([]);

    const [newStreamTitle, setNewStreamTitle] = useState("");
    const [newDate, setNewDate] = useState("");
    const [newSpeaker, setNewSpeaker] = useState("");
    const [isPublic, setIsPublic] = useState(false);



    const [updatedTitle, setUpdatedTitle] = useState("");

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

    const updateStreamTitle = async (id) => {
        const movieDoc = doc(db, "streamslive", id);
        await updateDoc(movieDoc, { Title: updatedTitle });
      };

    useEffect(() => {
        getStreamList();
    }, []);

    const onSubmitMovie = async () => {
        try {
          await addDoc(streamCollectionRef, {
            Title: newStreamTitle,
            date: newDate,
            public: isPublic,
            userId: auth?.currentUser?.uid,
          });
          getMovieList();
        } catch (err) {
          console.error(err);
        }
      };

      const deleteMovie = async (id) => {
        const movieDoc = doc(db, "streamslive", id);
        await deleteDoc(movieDoc);
      };


    return (
        <>
        <div>
        <input
          placeholder="Movie title..."
          onChange={(e) => setNewStreamTitle(e.target.value)}
        />
        <input
          placeholder="Release Date..."
          type="number"
          onChange={(e) => setNewDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        <label> Public or Private</label>
        <button onClick={onSubmitMovie}> Submit Movie</button>
            {streamList.map((stream) => (
                <div key={stream.id}>
                    <h1 style={{ color: stream.public ? "green" : "red" }}>{stream.Title}</h1>
                    <p>{stream.date}</p>
                    <p>{stream.public ? "yes" : <p>{stream.date}</p>}</p>

                    <input
                    value={stream.Title}
              placeholder="new title..."
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateStreamTitle(stream.id)}>
              {" "}
              Update Title
            </button>
            <button onClick={() => deleteMovie(stream.id)}> Delete Movie</button>


                </div>
            ))}
        </div>
        
        </>
    )
}


export default App;