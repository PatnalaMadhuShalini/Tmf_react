const React = window.React;

import styles from './styles.js';

const MovieCard = ({ movie, onViewMovie }) => (
  <div style={styles.movieCard} onClick={() => onViewMovie(movie.id)}>
    <div style={styles.moviePoster}>
      <img src={movie.poster} alt={movie.title} style={styles.moviePosterImg} />
      {movie.badge && <div style={styles.movieBadge}>{movie.badge}</div>}
      <div style={styles.movieRating}>
        ⭐ {movie.rating}/10 <span style={styles.votes}>{movie.votes} votes</span>
      </div>
    </div>
    <div style={styles.movieInfo}>
      <div style={styles.movieTitle}>{movie.title}</div>
      <div style={styles.movieGenre}>{movie.genre}</div>
      {movie.comingSoon && <div style={styles.comingSoonBadge}>{movie.comingSoon}</div>}
    </div>
  </div>
);

export default MovieCard;
