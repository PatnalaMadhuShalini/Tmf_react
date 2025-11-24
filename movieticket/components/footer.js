const React = window.React;

import styles from './styles.js';

const Footer = () => (
  <footer style={styles.footer}>
    <div style={styles.footerContainer}>
      <div>
        <h4 style={styles.footerSectionH4}>Movies Now Showing</h4>
        <ul style={styles.footerLinks}>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>The Phantom Quest</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Stellar Dreams</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Love & Thunder</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Mystery Island</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Fast Lane</a></li>
        </ul>
      </div>
      <div>
        <h4 style={styles.footerSectionH4}>Movies By Genre</h4>
        <ul style={styles.footerLinks}>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Action Movies</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Drama Movies</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Comedy Movies</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Thriller Movies</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Romance Movies</a></li>
        </ul>
      </div>
      <div>
        <h4 style={styles.footerSectionH4}>Cities</h4>
        <ul style={styles.footerLinks}>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Mumbai</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Delhi-NCR</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Bengaluru</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Hyderabad</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Chennai</a></li>
        </ul>
      </div>
      <div>
        <h4 style={styles.footerSectionH4}>Help</h4>
        <ul style={styles.footerLinks}>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>About Us</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Contact Us</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Privacy Policy</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>Terms & Conditions</a></li>
          <li style={styles.footerLinksLi}><a href="#" style={styles.footerLinksA}>FAQs</a></li>
        </ul>
      </div>
      <div>
        <h4 style={styles.footerSectionH4}>Follow Us</h4>
        <div style={styles.socialLinks}>
          <div style={styles.socialIcon}>📘</div>
          <div style={styles.socialIcon}>📷</div>
          <div style={styles.socialIcon}>🐦</div>
          <div style={styles.socialIcon}>📺</div>
        </div>
      </div>
    </div>
    <div style={styles.footerBottom}>
      <p>&copy; 2023 CineBook. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
