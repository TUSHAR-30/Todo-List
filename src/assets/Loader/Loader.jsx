import React from 'react'
import ReactDOM from 'react-dom';

import "./Loader.css"
function Loader() {
  return ReactDOM.createPortal(
    <div className="loading-overlay">
      <div className="spinner"></div>
    </div >,
    document.getElementById('loader')
  )
}

export default Loader