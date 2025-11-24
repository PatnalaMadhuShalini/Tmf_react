const React = window.React;

import styles from './styles.js';

const Actions = () => (
  <div style={styles.headerActions}>
    <button style={styles.btnSignin} onClick={() => console.log('Go to login')}>
      Sign in
    </button>
    <div style={styles.hamburger}>
      <span style={styles.hamburgerSpan}></span>
      <span style={styles.hamburgerSpan}></span>
      <span style={styles.hamburgerSpan}></span>
    </div>
  </div>
);

export default Actions;
