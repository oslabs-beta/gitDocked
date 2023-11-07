import React from 'react';

export default function ContainerHealth() {
  return (
    <>
      <h2>Compare App Health</h2>
      <div className='health-buttons'>
        <button>Overview</button>
        <button>Container</button>
      </div>
      <div className='health-items'>{/* Still have to implement functionality to show 2 containers side by side for comparison stats*/}</div>
    </>
  );
}
