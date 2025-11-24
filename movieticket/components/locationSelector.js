const React = window.React;

import styles from './styles.js';

const LocationSelector = ({ selectedCity, onOpenModal }) => (
  <div style={styles.headerLocation} onClick={onOpenModal}>
    <span>{selectedCity}</span> ▼
  </div>
);

export default LocationSelector;
