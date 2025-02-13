import { useState } from "react";
import { Logo, Nav, NumResults, Search } from "./components/Nav";
import { Box } from "./components/Box";
import { MovieList } from "./components/Movie";
import { WatchedMoviesContainer, WatchedMoviesList, WatchedSummary } from
  "./components/WatchedMovie";
import { useFetchMovies } from "./hooks/useFetchMovies";
import { MovieDetails } from "./components/MovieDetails";

/**
* Componente principal de la aplicación.
*/
export default function App() {

  // Estado para la búsqueda de películas
  const [query, setQuery] = useState("");

  // Obtiene películas basadas en la consulta
  const { movies, isLoading, error } = useFetchMovies(query);

  // Estado de películas vistas
  function initialWatched() {
    const localStorageWatched = localStorage.getItem('watchedMovies');
    return localStorageWatched ? JSON.parse(localStorageWatched) : [];
  }

  const [watched, setWatched] = useState(initialWatched);;

  // Estado para la película seleccionada
  const [selectedId, setSelectedId] = useState(null);

  /**
    * Maneja la selección de una película.
    * @param {string} id - ID de la película seleccionada.
    */
  function handleSelectMovie(id) {
    setSelectedId(id);
  }

  /**
    * Cierra los detalles de la película.
    */
  function handleCloseMovie() {
    setSelectedId(null);
  }

  /**
  * Agrega una película a la lista de vistas.
      * @param {Object} movie - Película a agregar.
      */
  function handleAddWatched(movie) {
    setWatched((prevWatched) => {
      const newWatched = [...prevWatched, movie];
      localStorage.setItem('watchedMovies', JSON.stringify(newWatched));
      return newWatched;
    });
  }

  function movieRemover(imdbID) {
    setWatched((prevWatched) => {
      const updatedWatched = prevWatched.filter((movie) => movie.imdbID !== imdbID);
      localStorage.setItem('watchedMovies', JSON.stringify(updatedWatched));
      return updatedWatched;
    });
  }

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Nav>
      <main className="main">
        <Box>
          {isLoading && <p className="loader">Cargando...</p>}
          {error && <p className="error">⛔ {error}</p>}
          <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
        </Box>

        <Box>
          <WatchedMoviesContainer>
            {selectedId ? (
              <MovieDetails
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
                watched={watched}
              />
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMoviesList watched={watched} onRemove={movieRemover} />
              </>
            )}
          </WatchedMoviesContainer>
        </Box>
      </main>
    </>
  );
}
