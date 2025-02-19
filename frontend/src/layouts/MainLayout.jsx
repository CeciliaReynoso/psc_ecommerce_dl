import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';  
import Hero from '../components/Hero';  
import RecentPosts from '../components/RecentPosts';  
import ProductGallery from '../components/ProductGallery';  

const MainLayout = () => {
  return (
    <div className='app-container'> 
      <main>
      <Navigation />
      <ProductGallery />
        <Outlet />
      </main>
      <footer>
        <p>© 2025 PetsCare. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default MainLayout;