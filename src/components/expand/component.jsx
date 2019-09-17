import React, { useState } from 'react';
import './styles.scss';

/*
document.getElementById('toggle').addEventListener('click', () => {
  document.getElementById('blender').classList.toggle('expand');
  document.getElementById('toggle').classList.toggle('s-module--hasZIndex--1QkpC');
});
*/

function Expand() {
  const [isExpanded, expand] = useState(false);

  return (
    <div className="c-expand">
      <div className="bg" />
      <button
        id="toggle"
        className={`toggle hasZIndex ${isExpanded ? 'hasZIndex' : ''}`}
        onClick={() => expand(!isExpanded)}
      >
        a
      </button>
      <div className={`blender ${isExpanded ? 'expand' : ''}`} id="blender" />
    </div>
  );
}

export default Expand;
