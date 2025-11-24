const React = window.React;

import styles from './styles.js';

const Navigation = () => (
  <nav style={styles.nav}>
    <div style={styles.navContainer}>
      <a href="#" style={styles.navLinkActive}>Movies</a>
      <a href="#" style={styles.navLink}>Stream</a>
      <a href="#" style={styles.navLink}>Events</a>
      <a href="#" style={styles.navLink}>Plays</a>
      <a href="#" style={styles.navLink}>Sports</a>
      <a href="#" style={styles.navLink}>Activities</a>
    </div>
  </nav>
);

export default Navigation;
