import React from 'react';
import { ROLES } from '../helpers/roles';

const Footer = () => {
  const userNombre = localStorage.getItem('userNombre');
  const userRol = localStorage.getItem('userRol');

  return (
    <footer className="footer">
      {userNombre && userRol ? (
        userRol === ROLES.CLIENTE ? (
          <p>Bienvenido {userNombre}</p>
        ) : (
          <p>{userNombre} - {userRol}</p>
        )
      ) : null}
      <div className="social-links">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
    </footer>
  );
};

export default Footer;