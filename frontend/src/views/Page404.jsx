import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Página No Encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <Link to="/">Volver a la Página Principal</Link>
    </div>
  );
};

export default Page404;