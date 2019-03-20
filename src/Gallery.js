import React from 'react'
import SearchComponent from './SearchComponent'
import GridComponent from './GridComponent'

const images_final = [
    { src: 'http://localhost:8090/assets/get/1A5A5092a_Jacob_Mueller_1.jpg', label: '1A5A5092a_Jacob_Mueller_1' },
    { src: 'http://localhost:8090/assets/get/Theaterplatz Panorama1.jpg', label: 'Theaterplatz Panorama1' },
    { src: 'http://localhost:8090/assets/get/IMG_7628.JPG', label: 'IMG_7628.JPG' },
    { src: 'http://localhost:8090/assets/get/IMG_8600.jpg', label: 'IMG_8600.jpg' }
  ];

  const API = 'http://localhost:8080/api/search/query?query='

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
        // this.setState({searchValue, images: images_final})

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