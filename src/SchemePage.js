import React from 'react'
import _ from 'lodash'
import {
    Segment,
  } from 'semantic-ui-react'
import FooterComponent from './components/FooterComponent'
import MenuComponent from './components/MenuComponent'
import SchemeComponent from './components/SchemeComponent'

export default class SchemePage extends React.Component {

    render() {

        return (
            <div id='page'>
                <Segment vertical className='segmentUpload'>
                    <MenuComponent activeItem='schemes'/>

                    <SchemeComponent/>

                </Segment>

                <FooterComponent />
            </div>
        );
    }
}