import styles from './styles.js';

// Logo Component
export const Logo = () => (
  <div style={styles.logo}>CineBook</div>
);

// SearchBar Component
export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

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

// LocationSelector Component
export const LocationSelector = ({ selectedCity, onOpenModal }) => (
  <div style={styles.headerLocation} onClick={onOpenModal}>
    <span>{selectedCity}</span> ▼
  </div>
);

// Actions Component
export const Actions = () => (
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

// Header Component
export const Header = ({ selectedCity, onOpenModal }) => (
  <header style={styles.header}>
    <div style={styles.headerContainer}>
      <Logo />
      <SearchBar />
      <LocationSelector selectedCity={selectedCity} onOpenModal={onOpenModal} />
      <Actions />
    </div>
  </header>
);

// Navigation Component
export const Navigation = () => (
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

// LocationModal Component
export const LocationModal = ({ isOpen, onClose, selectedCity, onSelectCity }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const popularCities = ['Mumbai', 'Delhi-NCR', 'Bengaluru', 'Hyderabad', 'Ahmedabad', 'Chandigarh', 'Chennai', 'Pune', 'Kolkata', 'Kochi'];
  const otherCities = ['Vijayawada', 'Visakhapatnam', 'Gurgaon', 'Noida', 'Jaipur', 'Lucknow', 'Surat', 'Nagpur', 'Indore', 'Bhopal'];

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

// BannerSlider Component
export const BannerSlider = () => {
  const [currentBanner, setCurrentBanner] = React.useState(0);
  const banners = [
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=1400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1400&h=400&fit=crop',
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <section style={styles.bannerSection}>
      <div style={styles.bannerSlider}>
        {banners.map((banner, index) => (
          <div key={index} style={index === currentBanner ? {...styles.bannerSlide, ...styles.bannerSlideActive} : styles.bannerSlide}>
            <img src={banner} alt="Banner" style={styles.bannerSlideImg} />
          </div>
        ))}
        <div style={styles.bannerDots}>
          {banners.map((_, index) => (
            <span
              key={index}
              style={index === currentBanner ? {...styles.bannerDot, ...styles.bannerDotActive} : styles.bannerDot}
              onClick={() => setCurrentBanner(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

// Filters Component
export const Filters = ({ activeFilter, onFilterChange }) => {
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

// MovieCard Component
export const MovieCard = ({ movie, onViewMovie }) => (
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

// MovieSection Component
export const MovieSection = ({ title, movies, onViewMovie, showSeeAll = true }) => (
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

// EntertainmentSection Component
export const EntertainmentSection = () => {
  const entertainment = [
    { icon: '🎭', title: 'Plays', gradient: 'linear-gradient(135deg, #fa7d09 0%, #f9cb28 100%)' },
    { icon: '⚽', title: 'Sports', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { icon: '🎵', title: 'Music Shows', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    { icon: '🎤', title: 'Comedy Shows', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    { icon: '🎨', title: 'Workshops', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
    { icon: '🎪', title: 'Kids', gradient: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)' },
  ];

  return (
    <section style={styles.entertainmentSection}>
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>The Best Of Entertainment</h2>
        </div>
        <div style={styles.entertainmentGrid}>
          {entertainment.map((item, index) => (
            <div key={index} style={styles.entertainmentCard}>
              <div style={{...styles.entertainmentIcon, background: item.gradient}}>
                {item.icon}
              </div>
              <div style={styles.entertainmentTitle}>{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Component
export const Footer = () => (
  <footer style={styles.footer}>
    <div style={styles.footerContainer}>
      <div>
        <h4 style={styles.footerSection.h4}>Movies Now Showing</h4>
        <ul style={styles.footerLinks}>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>The Phantom Quest</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Stellar Dreams</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Love & Thunder</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Mystery Island</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Fast Lane</a></li>
        </ul>
      </div>
      <div>
        <h4 style={styles.footerSection.h4}>Movies By Genre</h4>
        <ul style={styles.footerLinks}>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Action Movies</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Drama Movies</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Comedy Movies</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Thriller Movies</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Romance Movies</a></li>
        </ul>
      </div>
      <div>
        <h4 style={styles.footerSection.h4}>Cities</h4>
        <ul style={styles.footerLinks}>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Mumbai</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Delhi-NCR</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Bengaluru</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Hyderabad</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Chennai</a></li>
        </ul>
      </div>
      <div>
        <h4 style={styles.footerSection.h4}>Help</h4>
        <ul style={styles.footerLinks}>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>About Us</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Contact Us</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Privacy Policy</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Terms & Conditions</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>FAQs</a></li>
        </ul>
      </div>
      <div>
        <h4 style={styles.footerSection.h4}>Follow Us</h4>
        <div style={styles.socialLinks}>
          <div style={styles.socialIcon}>📘</div>
          <div style={styles.socialIcon}>📷</div>
          <div style={styles.socialIcon}>🐦</div>
          <div style={styles.socialIcon}>📺</div>
        </div>
      </div>
    </div>
    <div style={styles.footerBottom}>
      <p>&copy; 2025 CineBook Ltd. All Rights Reserved.</p>
    </div>
  </footer>
);
