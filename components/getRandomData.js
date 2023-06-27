import { db } from '../lib/config';  // replace './config' with the correct relative path to your config file
import { collection, getDocs } from 'firebase/firestore'; 

export async function getRandomData() {
    const snapshot = await getDocs(collection(db, 'sermons'));
  
    const totalCount = snapshot.size;
  
    let randomIndex = [];
    while(randomIndex.length < 3) {
      let r = Math.floor(Math.random() * totalCount);
      if(randomIndex.indexOf(r) === -1) randomIndex.push(r);
    }
  
    let randomData = [];
    randomIndex.forEach((index) => {
      // Get both the data and id from the Firestore document
      const doc = snapshot.docs[index];
      const data = doc.data();
      const id = doc.id;
  
      // Include the id in the returned object
      randomData.push({ id, ...data });
    });
  
    return randomData;
  }
  