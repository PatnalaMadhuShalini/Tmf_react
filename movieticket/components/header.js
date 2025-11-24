const React = window.React;

import styles from './styles.js';
import Logo from './logo.js';
import SearchBar from './searchBar.js';
import LocationSelector from './locationSelector.js';
import Actions from './actions.js';

const Header = ({ selectedCity, onOpenModal }) => (
  <header style={styles.header}>
    <div style={styles.headerContainer}>
      <Logo />
      <SearchBar />
      <LocationSelector selectedCity={selectedCity} onOpenModal={onOpenModal} />
      <Actions />
    </div>
  </header>
);

export default Header;
