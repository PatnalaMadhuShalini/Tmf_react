const React = window.React;

import styles from './styles.js';

const EntertainmentSection = () => {
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

export default EntertainmentSection;
