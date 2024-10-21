import { render, screen, waitFor, fireEvent, within } from '@testing-library/react';
import { collection, getDocs, where, query, doc, deleteDoc, addDoc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase-config';  // Your Firebase setup
import {deleteCollection, createMovie} from '../firebaseFunctions';

import MovieListView from './MovieListView';


describe("MovieListView component tests", ()=> {
    test("Checks to make sure there are no elements at start", async() => {
        deleteCollection("movies");

        render (<MovieListView />);
    
        const movieList = screen.getByTestId("movie-list-view");
        const movies = within(movieList).queryAllByRole('listitem');

        // Expect no list items to be present
        expect(movies.length).toBe(0);
    });

    test("Add two things to db, expect two things in list", async() => {
        await deleteCollection("movies");

        render (<MovieListView />);

        await createMovie({
            name: "Test Movie",
            genre: "Test Genre"
        });
        await createMovie({
            name: "Test Movie2",
            genre: "Test Genre2"
        });
    
        const movieList = screen.getByTestId("movie-list-view");
        const movies = within(movieList).queryAllByTestId("movie-item");

        // Expect two items to be present
        expect(movies.length).toBe(2);
    });
});
