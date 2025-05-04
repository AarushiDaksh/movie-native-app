import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for movie
interface Movie {
  id: string;
  title: string;
  poster_path: string;
}

interface SavedMoviesContextType {
  savedMovies: Movie[];
  saveMovie: (movie: Movie) => void;
  removeMovie: (id: string) => void;
}

const SavedMoviesContext = createContext<SavedMoviesContextType | undefined>(undefined);

export const SavedMoviesProvider = ({ children }: { children: ReactNode }) => {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);

  const saveMovie = (movie: Movie) => {
    setSavedMovies((prevMovies) => [...prevMovies, movie]);
  };

  const removeMovie = (id: string) => {
    setSavedMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  };

  return (
    <SavedMoviesContext.Provider value={{ savedMovies, saveMovie, removeMovie }}>
      {children}
    </SavedMoviesContext.Provider>
  );
};

// Custom hook to use saved movies
export const useSavedMovies = (): SavedMoviesContextType => {
  const context = useContext(SavedMoviesContext);
  if (!context) {
    throw new Error('useSavedMovies must be used within a SavedMoviesProvider');
  }
  return context;
};
