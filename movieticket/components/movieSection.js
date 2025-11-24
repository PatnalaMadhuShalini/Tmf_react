const React = window.React;

import styles from './styles.js';
import MovieCard from './movieCard.js';

const MovieSection = ({ title, movies, onViewMovie, showSeeAll = true }) => (
  <section style={styles.section}>
    <div style={styles.sectionHeader}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      {showSeeAll && <a href="#" style={styles.seeAll}>See All →</a>}
    </div>
    <div style={styles.moviesGrid}>
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} onViewMovie={onViewMovie} />
      ))}
    </div>
  </section>
);

export default MovieSection;
