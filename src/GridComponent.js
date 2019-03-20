import React from 'react';
import StackGrid, { transitions, easings } from 'react-stack-grid';

const transition = transitions.scaleDown;

const API = 'http://localhost:8090/assets/get/'

export default class GridComponent extends React.Component {

    constructor(props) {
        super(props)
        this.handlePath = this.handlePath.bind(this)
    }

    handlePath(path) {
        console.log(path)
        const arr = path.split('\\')
        console.log(arr)
        return API + arr[arr.length -1]
    }

    render() {

        const image_array = this.props.images

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
                    {image_array.map(obj => (
                        <figure
                            key={obj.reference}
                            className="image"
                        >
                            <img src={this.handlePath(obj.reference)} alt={obj.type} />
                            <figcaption>{obj.type}</figcaption>
                        </figure>
                        ))}
            </StackGrid>
        );
    }
}