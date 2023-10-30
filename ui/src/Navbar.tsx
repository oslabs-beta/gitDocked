import React from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';

export default function Navbar(avatar: object) {

  return (
    <>
      <div className='nav-grid'>
        <img src='https://itsmetommy.com/wp-content/uploads/github-actions-docker-1.png' alt='logo' />
        <img className='userpic' src={avatar.avatar} alt='profile pic' />
        <nav className='navbar'>
          <ul className='nav-list'>
            <li>
              <NavLink to='/' className={({ isActive }) => isActive ? 'active-link' : 'link'}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/charts' className={({ isActive }) => isActive ? 'active-link' : 'link'}>
                Charts
              </NavLink>
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
