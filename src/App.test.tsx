import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


describe("Standard App Tests", () => {
  //Does the page render the app?
test('renders Movie Name', () => {
  render(<App />);
  const linkElement = screen.getByText(/Movie Name:/i);
  expect(linkElement).toBeInTheDocument();
});

});

