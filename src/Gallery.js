import React from 'react'
import SearchComponent from './SearchComponent'
import GridComponent from './GridComponent'

const API = '/doc/query?query='

export default class GalleryComponent extends React.Component {

    constructor(props) {
        super(props)
        this.onResultSelected = this.onResultSelected.bind(this)
        this.state = {searchValue: '', images: []}
    }

    componentDidMount() {

    }

    onResultSelected(searchValue){
        console.log('onResultSelected ' + searchValue)

        fetch(API + searchValue)
            .then(response => response.json())
            .then(data => this.setState({searchValue, images: data}))
    }

    render() {
        return (
            <div>
            <SearchComponent 
                onResultSelected={this.onResultSelected}
            />
            <GridComponent
                images={this.state.images}
                />
        </div>
        );
    }
}