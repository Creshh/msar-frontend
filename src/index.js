import React from 'react';
import ReactDOM from 'react-dom';
import GalleryComponent from './Gallery';
import UploadComponent from './UploadComponent';

const title = 'Meta Search Application';


function App() {
    return (
        <div className="App">
            <div>{title}</div>
            <GalleryComponent />

            <UploadComponent />
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