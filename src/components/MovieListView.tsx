import React, { useState } from "react";
import { db } from "../firebase-config";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, doc, updateDoc} from "firebase/firestore";

/*
MovieListView.tsx
*/

function MovieListView() {
  const [value, loading, error] = useCollection(collection(db, "movies"));

  // Track which movie is being edited
  const [editingMovieId, setEditingMovieId] = useState<string | null>(null);
  const [editData, setEditData] = useState<{ name: string; genre: string }>({
    name: "",
    genre: "",
  });

  // Toggle the edit mode for a specific movie
  const toggleEdit = (
    movieId: string,
    currentData: { name: string; genre: string }
  ) => {
    if (editingMovieId === movieId) {
      // Cancel the edit
      setEditingMovieId(null);
    } else {
      // Enter edit mode
      setEditingMovieId(movieId);
      setEditData(currentData);
    }
  };

  // Save the edited movie (stub, you can add Firestore update logic here)
  const confirmEdit = async(movieId: string) => {
    // TODO: Add your update logic to Firestore here using `updateDoc`
    const docRef = doc(db, 'movies', movieId);

    await updateDoc(docRef, {name: editData.name, genre: editData.genre});

    console.log(`Saving movie ${movieId} with data:`, editData);
    setEditingMovieId(null); // Exit edit mode after saving
  };

  return (
    <div className="MovieListView" data-testid="movie-list-view">
      {value ? (
        <div data-testid="movie-list">
          {value.docs.map((obj) => {
            const movieData = obj.data();
            const movieId = obj.id;
            const isEditing = editingMovieId === movieId;

            return (
              <div className="moviebox" key={movieId} data-testid="movie-item">
                {isEditing ? (
                    <div>
                        <input
                            value={editData.name}
                            onChange={(e) =>
                                setEditData({ name: e.target.value, genre: editData.genre })
                            }
                            placeholder={obj.data().name}
                        />
                        <input
                            value={editData.genre}
                            onChange={(e) =>
                                setEditData({ name: editData.name, genre: e.target.value })
                            }
                            placeholder={obj.data().genre}
                        />
                        <br></br>
                        <button onClick={() => confirmEdit(movieId)}>Save</button>
                        <button onClick={() => setEditingMovieId(null)}>Cancel</button>
                    </div>
                ) : (
                    <div>
                <div>name: {obj.data().name}</div>

                <div>genre: {obj.data().genre}</div>
                <button onClick={() => toggleEdit(movieId, {name: editData.name, genre: editData.genre})}>Update Movie</button>
              </div>
                )}
            </div>
            );
          })}
        </div>
      ) : (
        <div>No Movies Found</div>
      )}
    </div>
  );
}

export default MovieListView;
