const React = window.React;
const { useState } = React;

import styles from './styles.js';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    console.log('Searching for:', e.target.value);
  };

  return (
    <div style={styles.searchContainer}>
      <span style={styles.searchIcon}>🔍</span>
      <input
        type="text"
        style={styles.searchBar}
        placeholder="Search for Movies, Events, Plays, Sports and Activities"
        value={searchTerm}
        onChange={handleSearch}
        onFocus={(e) => Object.assign(e.target.style, styles.searchBarFocus)}
        onBlur={(e) => Object.assign(e.target.style, styles.searchBar)}
      />
    </div>
  );
};

export default SearchBar;
