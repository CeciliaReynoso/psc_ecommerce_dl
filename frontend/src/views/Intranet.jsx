import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';  
import Admin from '../views/PrivateViews/Admin';
import Buyer from '../views/PrivateViews/Buyer';
import Seller from '../views/PrivateViews/Seller';

const Intranet = () => {
  return (
    <div>
      <Navigation />
      <main>
        <Admin
          path="/admin"
        />
        <Buyer
          path="/buyer"
        />
        <Seller
          path="/seller"          
        /> 
        <Outlet />       
      </main>
    </div>
  );
};

export default Intranet;