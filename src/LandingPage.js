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
import SearchComponent from './components/SearchComponent'


export default class LandingPage extends React.Component {

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

                            <SearchComponent
                                search={{
                                    fluid: true,
                                    className: 'primarySearch',
                                    category: true,
                                    input: { fluid: true, size: 'big' }
                                }}
                                onResultSelected={(result) => {
                                    this.props.history.push({
                                        pathname: '/search',
                                        data: result
                                    })
                                }}
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