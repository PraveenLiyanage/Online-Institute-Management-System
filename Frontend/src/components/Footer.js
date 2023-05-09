import React from 'react';
import './Footer.css'; // Import the CSS file for styling


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="social-icons">
            
            <a href="https://www.facebook.com/profile.php?id=100083349998299/" target="_blank" >
              <i className="fab fa-facebook-f">Facebook</i>
            </a>
          </div>
          <div className="contact-info">
            <p><a href="mailto:Nawamagaonline@gmail.com">Nawamagaonline@gmail.com</a> | Phone: 077 362 2225</p>
          </div>
       
        <p className="copyright"> @{new Date().getFullYear()}Nawamaga Website. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

//<a href="Nawamagaonline@gmail.com">Send email</a>