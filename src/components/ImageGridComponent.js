import React from 'react';
import StackGrid, { transitions, easings } from 'react-stack-grid';
import {Popup, Image, Button, Modal, Tab} from 'semantic-ui-react'
import ReactJson from 'react-json-view'
import QueryHandler from '../common/QueryHandler'
import {theme} from '../common/Constants'

const transition = transitions.scaleDown;


export default class ImageGridComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {open: false, reference: ''}
        this.showImage = this.showImage.bind(this)
        this.showMeta = this.showMeta.bind(this)
        this.close = this.close.bind(this)
    }

    showImage(reference){
        this.setState({openImage: true, reference: reference})
        console.log('show ' + reference)
    }

    showMeta(reference){
        const panes = []
        QueryHandler.getDocuments(reference)
            .then(documents => {
                console.log(documents)
                for(let [key, value] of Object.entries(documents)) {
                    panes.push({menuItem: key, render: () => <ReactJson src={value} enableClipboard={false} displayObjectSize={false} displayDataTypes={false} theme={theme}/>})
                }
                this.setState({openMeta: true, reference: reference, panes: panes})
            })
    }

    close(){
        this.setState({openImage: false, openMeta: false, reference: ''})
    }

    render() {
        const image_array = this.props.images
        const {openImage, openMeta, reference, panes} = this.state
        
        return (
        <div>
            <Modal dimmer open={openImage} onClose={this.close} basic size='fullscreen'>
                <Modal.Content image>
                    <Image wrapped src={QueryHandler.getAsset(reference, false)} />
                </Modal.Content>
            </Modal>

            <Modal dimmer open={openMeta} onClose={this.close} size='fullscreen'>
                <Modal.Content>
                    <Tab menu={{ pointing: true }} panes={panes} />
                </Modal.Content>
            </Modal>

            <StackGrid
                monitorImagesLoaded
                columnWidth={300}
                duration={600}
                gutterWidth={5}
                gutterHeight={5}
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
                            <Image className='gridImage' src={QueryHandler.getAsset(obj.reference, true)} alt={obj.type}/>
                            <div className='imageLabel'>
                            <Button.Group floated='right'>
                                
                                <Popup inverted position='top center' size='tiny' trigger={<Button className='imageButton' color='black' icon='expand' alt='Show Image' onClick={() => this.showImage(obj.reference)}/>} content='Show Image' />
                                <Popup inverted position='top center' size='tiny' trigger={<Button className='imageButton' color='black' icon='file alternate outline' onClick={() => this.showMeta(obj.reference)}/>} content='Show Metadata' />
                                <Popup inverted position='top center' size='tiny' trigger={<Button className='imageButton' color='black' icon='add'/>} content='Add Metadata' /> {/*file code*/}
                                <Popup inverted position='top center' size='tiny' trigger={<Button className='imageButton' color='black' icon='download'/>} content='Download Image' /> {/*upload*/}
                                <Popup inverted position='top center' size='tiny' trigger={<Button className='imageButton' color='black' icon='linkify'/>} content='Copy Link' /> {/*share alternate*/}
                                 
                            </Button.Group>
                            </div>
                        </div>
                        ))}
            </StackGrid>
            </div>
        );
    }
}