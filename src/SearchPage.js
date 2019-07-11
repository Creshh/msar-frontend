import React from 'react'
import _ from 'lodash'
import {
    Segment, Divider, Button
  } from 'semantic-ui-react'
import ImageGridComponent from './components/ImageGridComponent'
import FooterComponent from './components/FooterComponent'
import MenuComponent from './components/MenuComponent'
import FilterComponent from './components/FilterComponent';
import SearchComponent from './components/SearchComponent'
import QueryHandler from './common/QueryHandler'

export default class SearchPage extends React.Component {

    //housenumber_34: {field: 'housenumber', value: '34', range: '69', add: false},

    constructor(props){
        super(props)
        this.onResultSelected = this.onResultSelected.bind(this)
        this.onTagsChanged = this.onTagsChanged.bind(this)
        this.deleteAll = this.deleteAll.bind(this)

        this.state = {images: [], query: this.props.location.data, tags: this.props.location.data ? true : false}
    }

    onTagsChanged(tags){
        if(!_.isEmpty(tags)){
            QueryHandler.multiple(JSON.stringify(tags))
                .then(json => {
                    this.setState({images: json})
                })
        } else {
            this.setState({tags: false, images: []})
        }
    }

    onResultSelected(value) {
        QueryHandler.query(value)
            .then(json => {
                this.setState({images: json, query: value, tags: true})
            })
    }


    deleteAll(){
        const {images} = this.state
        images.map(obj => {
            QueryHandler.removeAsset(obj.reference)
                .then(result => {
                    console.log(result)
                    this.setState({tags: false, tags: [], query: '', images: []})
                    this.onTagsChanged([])
                })
        })
    }

    downloadAll(){
        const {images} = this.state
        const links = []
        images.map(obj => {
            links.push(QueryHandler.getAsset(obj.reference, false, true))
        })
        QueryHandler.downloadJson(links)
    }

    render() {
        const {images, query, tags} = this.state

        return (

            <div id='page'>
                <Segment vertical className='segmentSearch'>
                    <MenuComponent activeItem='search'/>

                    {tags ? 
                        <FilterComponent 
                            defaultValue = {query}
                            onTagsChanged = {this.onTagsChanged}/>
                    :
                        <SearchComponent
                            // defaultValue= {this.props.location.data}
                            search={{
                                size: 'small',
                                className: 'secondarySearch',
                                category: true,
                                input: { fluid: true}
                            }}
                            onResultSelected= {this.onResultSelected}
                        />
                    }
                  
                    <div className='secondarySearch'>
                        <Button className='imageButton' color='black' content='Delete all shown assets and documents' icon='trash' onClick={() => this.deleteAll()} />
                        <Button className='imageButton' color='black' content='Get all references' icon='download' onClick={() => this.downloadAll()} />
                    </div>

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