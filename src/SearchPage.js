import React from 'react'
import _ from 'lodash'
import {
    Segment,
  } from 'semantic-ui-react'
import ImageGridComponent from './components/ImageGridComponent'
import FooterComponent from './components/FooterComponent'
import MenuComponent from './components/MenuComponent'
import FilterComponent from './components/FilterComponent';
import SearchComponent from './components/SearchComponent'

export default class SearchPage extends React.Component {

    constructor(props){
        super(props)

        console.log('constructor' + this.props.location)
    }

    render() {
        const images = []
        for(var i = 1; i<=15; i++){
            images.push({reference: i, type: 'type'})
        }
        console.log(this.props.location)
        return (

            <div id='page'>
                <Segment vertical className='segmentSearch'>
                    <MenuComponent activeItem='search'/>
                    {/* <Divider/> */}

                    <SearchComponent
                        defaultValue= {this.props.location.data}
                        search={{
                            size: 'small',
                            className: 'secondarySearch',
                            category: true,
                            input: { fluid: true}
                        }}
                        onResultSelected={(result) => {
                            console.log(result)
                            
                        }}
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