const React = window.React;
const { useState, useEffect } = React;

import styles from './styles.js';

const BannerSlider = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = [
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=1400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1400&h=400&fit=crop',
  ];

  useEffect(() => {
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

export default BannerSlider;
