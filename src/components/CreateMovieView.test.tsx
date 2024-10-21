
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../firebase-config';  // Your Firebase setup
import {deleteCollection} from '../firebaseFunctions';

import CreateMovieView from './CreateMovieView';


describe("CreateMovieView component tests", () =>{
    test("Renders the button", () => {
        render (<CreateMovieView />);
    
        const buttonElement = screen.getByText(/Send to DB/i);
        expect(buttonElement).toBeInTheDocument();
    });
    
    test("Movie added to database when clicked", async() => {
    
        render (<CreateMovieView />);
    
        await deleteCollection("movies");
    
    
        const nameInput = screen.getByTestId('movie-name-input');
        const genreInput = screen.getByTestId('movie-genre-input');
    
        fireEvent.change(nameInput, { target: { value: 'Inception' } });
        fireEvent.change(genreInput, { target: { value: 'Sci-Fi' } });
    
        const buttonElement = screen.getByText(/Send to DB/i);
    
        fireEvent.click(buttonElement);
    
        
        await waitFor(async () => {
            const q = query(collection(db, "movies"), where("name", "==", "Inception"));
            const querySnapshot = await getDocs(q);
            expect(querySnapshot.size).toBe(1);
        });
    });
});

