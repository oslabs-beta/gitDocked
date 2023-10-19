import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

export default function Navbar(props) {

  return (
    <>
      <div className='nav-grid'>
        <img src='https://itsmetommy.com/wp-content/uploads/github-actions-docker-1.png' alt='logo' />
        <img src={props.avatar} alt='profile pic' />
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
