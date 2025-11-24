import { BannerSlider, Filters, MovieSection, EntertainmentSection } from './components.js';

// Body Component
export const Body = ({ activeFilter, onFilterChange, onViewMovie }) => {
  const recommendedMovies = [
    {
      id: 1,
      title: 'The Phantom Quest',
      genre: 'Action/Adventure/Thriller',
      poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop',
      badge: 'IMAX',
      rating: '8.5',
      votes: '124K'
    },
    {
      id: 2,
      title: 'Stellar Dreams',
      genre: 'Sci-Fi/Thriller',
      poster: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=300&h=450&fit=crop',
      badge: '3D',
      rating: '9.0',
      votes: '98K'
    },
    {
      id: 3,
      title: 'Love & Thunder',
      genre: 'Romance/Drama',
      poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&h=450&fit=crop',
      badge: '2D',
      rating: '8.8',
      votes: '156K'
    },
    {
      id: 4,
      title: 'Mystery Island',
      genre: 'Mystery/Adventure',
      poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop',
      badge: '2D',
      rating: '8.2',
      votes: '87K'
    },
    {
      id: 5,
      title: 'Fast Lane',
      genre: 'Action/Thriller',
      poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop',
      badge: '4DX',
      rating: '8.7',
      votes: '112K'
    },
    {
      id: 6,
      title: 'Kingdom Rising',
      genre: 'Action/Fantasy',
      poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=450&fit=crop',
      badge: 'IMAX',
      rating: '8.9',
      votes: '134K'
    },
    {
      id: 7,
      title: 'Laugh Riot',
      genre: 'Comedy/Family',
      poster: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop',
      badge: '3D',
      rating: '7.8',
      votes: '76K'
    },
    {
      id: 8,
      title: 'Dark Shadows',
      genre: 'Horror/Thriller',
      poster: 'https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?w=300&h=450&fit=crop',
      badge: '2D',
      rating: '8.4',
      votes: '91K'
    }
  ];

  const comingSoonMovies = [
    {
      id: 9,
      title: 'Galactic Warriors',
      genre: 'Sci-Fi/Action',
      poster: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=300&h=450&fit=crop',
      comingSoon: 'DEC 25'
    },
    {
      id: 10,
      title: 'Heart Strings',
      genre: 'Romance/Musical',
      poster: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=300&h=450&fit=crop',
      comingSoon: 'JAN 5'
    },
    {
      id: 11,
      title: 'The Last Stand',
      genre: 'Action/Drama',
      poster: 'https://images.unsplash.com/photo-1574267432644-f74f331c5f41?w=300&h=450&fit=crop',
      comingSoon: 'JAN 12'
    },
    {
      id: 12,
      title: 'Haunted Manor',
      genre: 'Horror/Mystery',
      poster: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=300&h=450&fit=crop',
      comingSoon: 'JAN 20'
    }
  ];

  return (
    <div>
      <BannerSlider />
      <Filters activeFilter={activeFilter} onFilterChange={onFilterChange} />
      <MovieSection title="Recommended Movies" movies={recommendedMovies} onViewMovie={onViewMovie} />
      <MovieSection title="Coming Soon" movies={comingSoonMovies} onViewMovie={onViewMovie} showSeeAll={false} />
      <EntertainmentSection />
    </div>
  );
};
