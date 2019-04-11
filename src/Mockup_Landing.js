import React from 'react'
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Search,
    Segment,
    Sidebar,
    Visibility,
  } from 'semantic-ui-react'

import FooterComponent from './components/FooterComponent'
import MenuComponent from './components/MenuComponent'


export default class Mockup extends React.Component {

    render() {
        return (
            <div id='page'>
                <Segment vertical inverted className='segmentLanding'>
                    
                    <MenuComponent inverted />
                    {/* <Divider/> */}
                    <Container text textAlign='center' className='containerLandingSearch'>
                            <Header id='landingH1'
                                as='h1'
                                content='Image Retrieval'
                                inverted
                            />
                            <Header id='landingH2'
                                as='h2'
                                content='Search for Exif Tags, Objects, Persons, Locations, ...'
                                inverted
                            />
                            <Search fluid input={{ fluid: true }} className='primarySearch'
                                size='big'
                                category
                            />
                            {// Last Search
                                // <Label as='a'>
                                // Happy
                                // <Label.Detail>22</Label.Detail>
                                // </Label>
                            }
                    </Container>
                </Segment>
                <FooterComponent />
            </div>
        );
    }
}