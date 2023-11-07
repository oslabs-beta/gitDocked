import React, { useState } from 'react';

export default function ToggleButton() {
  const [toggled, setToggled] = useState(false);

  return (
    <>
      <div className='toggle-div'>
        <p>Only show running containers</p>
        <button className={`toggle-btn ${toggled ? 'toggled' : ''}`} onClick={() => setToggled(!toggled)}>
          <div className='thumb'></div>
        </button>
      </div>
    </>
  );
}
