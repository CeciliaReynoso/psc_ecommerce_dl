import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation'; 
import Buyer from '../views/PrivateViews/Buyer';

const BuyerLayout = () => {
  return (
    <div>
      <Navigation />
      <main className='admin-container'>
        <Buyer
          path="/buyer"
        />
        <Outlet />       
      </main>
    </div>
  );
};

export default BuyerLayout;