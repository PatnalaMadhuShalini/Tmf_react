const React = window.React;

import styles from './styles.js';

const Filters = ({ activeFilter, onFilterChange }) => {
  const filters = ['All', 'Telugu', 'Hindi', 'English', 'Tamil', '2D', '3D', 'IMAX'];

  return (
    <section style={styles.filtersSection}>
      <div style={styles.filtersContainer}>
        {filters.map(filter => (
          <div
            key={filter}
            style={activeFilter === filter.toLowerCase() ? {...styles.filterChip, ...styles.filterChipActive} : styles.filterChip}
            onClick={() => onFilterChange(filter.toLowerCase())}
          >
            {filter}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Filters;
