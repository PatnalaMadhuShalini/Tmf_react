const React = window.React;
const { useState } = React;

import styles from './styles.js';

const LocationModal = ({ isOpen, onClose, selectedCity, onSelectCity }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const popularCities = ['Mumbai', 'Delhi-NCR', 'Bengaluru', 'Hyderabad', 'Ahmedabad', 'Chandigarh', 'Chennai', 'Pune', 'Kolkata', 'Kochi'];
  const otherCities = ['Vijayawada', 'Visakhapatnam', 'Gurgaon', 'Noida', 'Jaipur', 'Lucknow', 'Surat', 'Nagpur', 'Indore', 'Bhopal'];

  const filteredCities = [...popularCities, ...otherCities].filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCity = (city) => {
    onSelectCity(city);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{...styles.locationModal, ...styles.locationModalShow}}>
      <div style={styles.locationModalContent}>
        <button style={styles.modalClose} onClick={onClose}>✕</button>
        <div style={styles.modalHeader}>
          <h2>Select Your City</h2>
          <p style={styles.modalSubtitle}>Select a city to see movies & events near you</p>
        </div>

        <div style={styles.locationSearch}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search for your city"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.locationSearchInput}
          />
        </div>

        <h3 style={styles.popularCitiesTitle}>Popular Cities</h3>
        <div style={styles.citiesGrid}>
          {popularCities.filter(city => city.toLowerCase().includes(searchTerm.toLowerCase())).map(city => (
            <div
              key={city}
              style={selectedCity === city ? {...styles.cityCard, ...styles.cityCardSelected} : styles.cityCard}
              onClick={() => handleSelectCity(city)}
            >
              {city}
            </div>
          ))}
        </div>

        <h3 style={{...styles.popularCitiesTitle, marginTop: '1.5rem'}}>Other Cities</h3>
        <div style={styles.citiesList}>
          {otherCities.filter(city => city.toLowerCase().includes(searchTerm.toLowerCase())).map(city => (
            <div
              key={city}
              style={styles.cityListItem}
              onClick={() => handleSelectCity(city)}
            >
              {city}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
