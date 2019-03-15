import React from 'react';
import StackGrid from 'react-stack-grid';


const images = [
    { src: '../test_images/Theaterplatz Panorama1.jpg', label: 'Theaterplatz Panorama1' },
    { src: '../test_images/IMG_7628.JPG', label: 'IMG_7628.JPG' },
    { src: '../../test_images/IMG_8600.jpg', label: 'IMG_8600.jpg' }
  ];

export default class GridComponent extends React.Component {

    reloadImages() {
        this.setState({})
    }

    componentDidMount() {

    }

    render() {
        return (
            <StackGrid columnWidth={150}>
                {images.map(obj => (
                    <figure
                        key={obj.src}
                        className="image"
                    >
                        <img src={obj.src} alt={obj.label} />
                        <figcaption>{obj.label}</figcaption>
                    </figure>
                    ))}
            </StackGrid>
        );
    }
}