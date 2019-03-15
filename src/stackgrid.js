import React from 'react';
import StackGrid, { transitions, easings } from 'react-stack-grid';

const transition = transitions.scaleDown;

const images = [
    { src: 'http://localhost:8090/assets/get/1A5A5092a_Jacob_Mueller_1.jpg', label: '1A5A5092a_Jacob_Mueller_1' },
    { src: 'http://localhost:8090/assets/get/Theaterplatz Panorama1.jpg', label: 'Theaterplatz Panorama1' },
    { src: 'http://localhost:8090/assets/get/IMG_7628.JPG', label: 'IMG_7628.JPG' },
    { src: 'http://localhost:8090/assets/get/IMG_8600.jpg', label: 'IMG_8600.jpg' }
  ];

export default class GridComponent extends React.Component {

    reloadImages() {
        this.setState({})
    }

    componentDidMount() {

    }

    render() {
        return (
            <StackGrid
                monitorImagesLoaded
                columnWidth={300}
                duration={600}
                gutterWidth={15}
                gutterHeight={15}
                easing={easings.cubicOut}
                appearDelay={60}
                appear={transition.appear}
                appeared={transition.appeared}
                enter={transition.enter}
                entered={transition.entered}
                leaved={transition.leaved}>
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