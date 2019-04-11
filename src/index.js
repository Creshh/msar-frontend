import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from "react-router-dom";

import MockupSearch from './Mockup_Search';
import MockupLanding from './Mockup_Landing';

const styleLink = document.createElement("link")
styleLink.rel = "stylesheet"
styleLink.href = "//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
document.head.appendChild(styleLink)

ReactDOM.render(
    <Router>
        <div id='index'>
            <Route path='/' exact component={MockupLanding} />
            <Route path='/search' component={MockupSearch} />
        </div>
    </Router>,
    document.getElementById('main')
);