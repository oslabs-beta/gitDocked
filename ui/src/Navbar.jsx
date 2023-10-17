import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import StatusLog from './StatusLog';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <div className='nav-grid'>
        <img src='https://itsmetommy.com/wp-content/uploads/github-actions-docker-1.png' alt='logo' />
        <nav className='navbar'>
          <ul className='nav-list'>
            <li>
              <Link to='/' className='link'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/charts' className='link'>
                Charts
              </Link>
            </li>
          </ul>
        </nav>

        <main>
          {/* <button onClick={() => navigate('/charts')}>Go Charts</button> */}
          <Routes>
            <Route path='/'></Route>
            <Route path='/charts'></Route>
          </Routes>
        </main>
      </div>
    </>
  );
}
