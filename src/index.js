import React from 'react';
import ReactDOM from 'react-dom';
import GalleryComponent from './Gallery';

const title = 'Meta Search Application';


function App() {
    return (
        <div>
            <div>{title}</div>
            <GalleryComponent />
        </div>
    );
  }

  const styleLink = document.createElement("link")
  styleLink.rel = "stylesheet"
  styleLink.href = "//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
  document.head.appendChild(styleLink)

ReactDOM.render(
    <App />,
    document.getElementById('app')
);