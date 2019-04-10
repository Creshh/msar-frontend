import React from 'react';
import StackGrid, { transitions, easings } from 'react-stack-grid';
import {Label, Image, Button} from 'semantic-ui-react'
const transition = transitions.scaleDown;

const ASSETS_GET = '/assets/get/'

export default class GridComponent extends React.Component {

    constructor(props) {
        super(props)
        this.handlePath = this.handlePath.bind(this)
    }

    handlePath(reference) {
        console.log(reference)
        // const arr = reference.split('\\')
        // console.log(arr)
        // return ASSETS_GET + arr[arr.length -1]
        return ASSETS_GET + reference + '?thumb=true'
    }

    render() {
        const image_array = this.props.images
        // ToDo: Show additional Information on Hover on transparent plane
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
                        <div key={obj.reference} className='imageContainer'>
                            {/* <Label className='imageLabel' attached='bottom'>{obj.type}</Label> */}
                            <Image className='gridImage' src={this.handlePath(obj.reference)} alt={obj.type}/>
                            <div className='imageLabel'>
                                
                                <Button color='olive'>Add MetaData</Button>
                            </div>
                        </div>
                        ))}
            </StackGrid>
        );
    }
}