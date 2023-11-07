import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { App } from './App';
import Charts from './Charts';

export default function Navbar(avatar) {
  return (
    <>
      <div className='nav-grid'>
        <img src='https://itsmetommy.com/wp-content/uploads/github-actions-docker-1.png' alt='logo' />
        <img className='userpic' src={avatar.avatar} alt='profile pic' />
        <nav className='navbar'>
          <ul className='nav-list'>
            <li>
              <NavLink to='/' className={({ isActive }) => (isActive ? 'active-link' : 'link')}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/charts' className={({ isActive }) => (isActive ? 'active-link' : 'link')}>
                Charts
              </NavLink>
            </li>
          </ul>
        </nav>

        <main>
          {/* <button onClick={() => navigate('/charts')}>Go Charts</button> */}
          {/* <Routes>
            <Route path='/' ></Route>
            <Route path='/charts' element={<Charts />}></Route>
          </Routes> */}
        </main>
      </div>
    </>
  );
}
