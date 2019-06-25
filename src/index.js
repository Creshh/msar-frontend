import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from "react-router-dom";

import SearchPage from './SearchPage';
import LandingPage from './LandingPage';
import UploadPage from './UploadPage';
import SchemePage from './SchemePage';
import DocPage from './DocPage';

const styleLink = document.createElement("link")
styleLink.rel = "stylesheet"
styleLink.href = "//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
document.head.appendChild(styleLink)

ReactDOM.render(
    <Router>
        <div id='index'>
            <Route path='/' exact component={LandingPage} />
            <Route path='/search' component={SearchPage} />
            <Route path='/upload' component={UploadPage} />
            <Route path='/schemes' component={SchemePage} />
            <Route path='/doc' component={DocPage} />
        </div>
    </Router>,
    document.getElementById('main')
);