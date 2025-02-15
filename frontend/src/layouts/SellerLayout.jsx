import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';  
import Seller from '../views/PrivateViews/Seller';

const SellerLayout = () => {
  return (
    <div>
      <Navigation />
      <main className='app-container'>  
         <div style={{paddingLeft: '3rem'}}>  
         <div className='className="table table-striped"'> 
         </div>                                        
          <Outlet />    
          </div>   
      </main>
    </div>
  );
};

export default SellerLayout;