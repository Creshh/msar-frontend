import React from 'react';
import StackGrid, { transitions, easings } from 'react-stack-grid';

const transition = transitions.scaleDown;

export default class GridComponent extends React.Component {

    constructor(props) {
        super(props)
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