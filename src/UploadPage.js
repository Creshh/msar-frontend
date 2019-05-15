import React from 'react'
import _ from 'lodash'
import {
    Segment,
  } from 'semantic-ui-react'
import FooterComponent from './components/FooterComponent'
import MenuComponent from './components/MenuComponent'
import UploadComponent from './components/UploadComponent'

export default class UploadPage extends React.Component {

    render() {
        const images = []
        for(var i = 1; i<=15; i++){
            images.push({reference: i, type: 'type'})
        }

        return (
            <div id='page'>
                <Segment vertical className='segmentUpload'>
                    <MenuComponent activeItem='upload'/>

                    <UploadComponent/>

                </Segment>

                <FooterComponent />
            </div>
        );
    }
}