import { collection, getDocs, query, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase-config';  // Your Firebase setup

import movie from './models/movie';

async function deleteCollection(collectionName: string) {
    try {
      const collectionRef = collection(db, collectionName);
      const querySnapshot = await getDocs(query(collectionRef));
  
      if (querySnapshot.empty) {
        console.log(`Collection ${collectionName} is already empty`);
        return;
      }
  
      const deletePromises = querySnapshot.docs.map((document) => {
        console.log(`Deleting document ${document.id}`);
        return deleteDoc(doc(db, collectionName, document.id));
      });
  
      await Promise.all(deletePromises);
      console.log(`All documents in the ${collectionName} collection deleted.`);
    } catch (error) {
      console.error(`Error deleting collection ${collectionName}:`, error);
      throw error; // Re-throw to make sure the test fails properly if there's an error
    }
  }

async function createMovie(movie : movie){
  await addDoc(collection(db, 'movies'), {
              name: movie.name,
              genre: movie.genre
  });
}

async function updateMovie(movie : movie, id: string){
  const docRef = doc(db, 'movies', id);

  await updateDoc(docRef, {
    name: movie.name,
    genre: movie.genre
  });
}

export {deleteCollection, createMovie, updateMovie};