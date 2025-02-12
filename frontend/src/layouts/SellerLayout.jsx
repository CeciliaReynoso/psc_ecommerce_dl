import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';  
import Seller from '../views/PrivateViews/Seller';

const SellerLayout = () => {
  return (
    <div>
      <Navigation />
      <main className='app-container'>
        <Seller
          path="/seller"          
        /> 
        <Outlet />       
      </main>
    </div>
  );
};

export default SellerLayout;