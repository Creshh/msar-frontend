import React from 'react'
import _ from 'lodash'
import {
    Search,
    Segment,
  } from 'semantic-ui-react'
import ImageGridComponent from './components/ImageGridComponent'
import FooterComponent from './components/FooterComponent'
import MenuComponent from './components/MenuComponent'
import FilterComponent from './components/FilterComponent';

export default class SearchPage extends React.Component {

    render() {
        const images = []
        for(var i = 1; i<=15; i++){
            images.push({reference: i, type: 'type'})
        }

        return (
            <div id='page'>
                <Segment vertical className='segmentSearch'>
                    <MenuComponent activeItem='search'/>
                    {/* <Divider/> */}

                    <Search 
                        input={{ 
                            fluid: true 
                        }}
                        className='secondarySearch'
                        size='small'
                        category
                    />

                    <div className='grid'>
                        <div className= 'grid-filters'>
                            <FilterComponent />
                        </div> 
                        <Segment basic className='grid-images'>
                            <ImageGridComponent
                                images={images}
                            />
                        </Segment>
                    </div>
                </Segment>

                <FooterComponent />
            </div>
        );
    }
}