import React from 'react'
import _ from 'lodash'
import {
    Segment, Divider,
  } from 'semantic-ui-react'
import ImageGridComponent from './components/ImageGridComponent'
import FooterComponent from './components/FooterComponent'
import MenuComponent from './components/MenuComponent'
import FilterComponent from './components/FilterComponent';
import SearchComponent from './components/SearchComponent'
import QueryHandler from './common/QueryHandler'

export default class SearchPage extends React.Component {

    constructor(props){
        super(props)
        this.onResultSelected = this.onResultSelected.bind(this)
        this.state = {images: []}
        if(this.props.location.data){
            this.onResultSelected(this.props.location.data)
        }
    }

    onResultSelected(value) {
        console.log(value)
        QueryHandler.query(value)
            .then(json => {
                this.setState({images: json})
            })
    }

    render() {
        const images = this.state.images

        console.log(this.props.location.data)

        return (

            <div id='page'>
                <Segment vertical className='segmentSearch'>
                    <MenuComponent activeItem='search'/>

                    <SearchComponent
                        defaultValue= {this.props.location.data}
                        search={{
                            size: 'small',
                            className: 'secondarySearch',
                            category: true,
                            input: { fluid: true}
                        }}
                        onResultSelected= {this.onResultSelected}
                    />

                    <FilterComponent />
                    <Divider />
                    <Segment basic className='grid-images'>
                        <ImageGridComponent
                            images={images}
                        />
                    </Segment>
                </Segment>

                <FooterComponent />
            </div>
        );
    }
}