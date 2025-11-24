const React = window.React;
const ReactDOM = window.ReactDOM;

import styles from './components/styles.js';
import Header from './components/header.js';
import Navigation from './components/navigation.js';
import BannerSlider from './components/bannerSlider.js';
import Filters from './components/filters.js';
import MovieSection from './components/movieSection.js';
import EntertainmentSection from './components/entertainmentSection.js';
import Footer from './components/footer.js';
import LocationModal from './components/locationModal.js';

const { useState } = React;

// Main App Component
const App = () => {
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const movies = [
    { id: 1, title: 'The Phantom Quest', poster: 'https://images.unsplash.com/photo-1489599735734-79b4d4c1b0a?w=300&h=450&fit=crop', rating: 8.5, votes: '1.2K', genre: 'Action, Adventure', badge: 'New' },
    { id: 2, title: 'Stellar Dreams', poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop', rating: 7.8, votes: '890', genre: 'Sci-Fi, Drama' },
    { id: 3, title: 'Love & Thunder', poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop', rating: 9.2, votes: '2.1K', genre: 'Romance, Comedy' },
    { id: 4, title: 'Mystery Island', poster: 'https://images.unsplash.com/photo-1489599735734-79b4d4c1b0a?w=300&h=450&fit=crop', rating: 8.0, votes: '1.5K', genre: 'Thriller, Mystery' },
    { id: 5, title: 'Fast Lane', poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop', rating: 7.5, votes: '950', genre: 'Action, Racing' },
    { id: 6, title: 'Coming Soon Movie', poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop', rating: 0, votes: '0', genre: 'Drama', comingSoon: 'Coming Soon' },
  ];

  const handleViewMovie = (movieId) => {
    console.log('Viewing movie:', movieId);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSelectCity = (city) => setSelectedCity(city);
  const handleFilterChange = (filter) => setActiveFilter(filter);

  return (
    <div style={styles.body}>
      <Header selectedCity={selectedCity} onOpenModal={handleOpenModal} />
      <Navigation />
      <BannerSlider />
      <Filters activeFilter={activeFilter} onFilterChange={handleFilterChange} />
      <MovieSection title="Recommended Movies" movies={movies} onViewMovie={handleViewMovie} />
      <MovieSection title="Now Showing" movies={movies.filter(m => !m.comingSoon)} onViewMovie={handleViewMovie} />
      <EntertainmentSection />
      <Footer />
      <LocationModal isOpen={isModalOpen} onClose={handleCloseModal} selectedCity={selectedCity} onSelectCity={handleSelectCity} />
    </div>
  );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
