import React from 'react';
import StackGrid, { transitions, easings } from 'react-stack-grid';
import {Label, Popup, Image, Button, Grid, Modal, Header, Tab} from 'semantic-ui-react'
import ReactJson from 'react-json-view'

const transition = transitions.scaleDown;

const ASSETS_GET = '/assets/get/'

export default class ImageGridComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {open: false, reference: ''}
        this.handlePath = this.handlePath.bind(this)
        this.showImage = this.showImage.bind(this)
        this.showMeta = this.showMeta.bind(this)
        this.close = this.close.bind(this)
    }


    handlePath(reference, thumb) {
        console.log(reference)
        // const arr = reference.split('\\')
        // console.log(arr)
        // return ASSETS_GET + arr[arr.length -1]
        return ASSETS_GET + reference + (thumb ? '?thumb=true' : '')
    }

    showImage(reference){
        this.setState({openImage: true, reference: reference})
        console.log('show ' + reference)
    }

    showMeta(reference){
        this.setState({openMeta: true, reference: reference})
        console.log('show ' + reference)
    }

    close(){
        this.setState({openImage: false, openMeta: false, reference: ''})
        console.log('close')
    }

    render() {
        const image_array = this.props.images
        const {openImage, openMeta, reference} = this.state

        const theme = {
            base00: "rgba(255,255,255,0)",
            base01: "black",
            base02: "black",
            base03: "black",
            base04: "black",
            base05: "black",
            base06: "black",
            base07: "black",
            base08: "black",
            base09: "black",
            base0A: "black",
            base0B: "black",
            base0C: "black",
            base0D: "black",
            base0E: "black",
            base0F: "black",
        }

        const jsonDummy1 = {
            reference: "5",
            country: "French Southern Territories",
            number: "07727",
            city: "North Nolachester",
            street: "Daniel Inlet",
            latitude: -7.7790308,
            source: "faker",
            type: "location",
            longitude: -119.75346
        }

        const jsonDummy2 = {
            orientation: "landscape",
            focallength: "110",
            xdim: 5760,
            source: "exif",
            type: "exif",
            manufacturer: "Canon",
            reference: "15",
            exposuretime: "1/3200",
            meteringmode: "Multi-segment",
            datetime: "2018:06:27 19:17:28",
            ydim: 3240,
            isospeed: "500",
            model: "Canon EOS 5D Mark III",
            fnumber: "2.8",
            compression: "0",
            datetimeoriginal: "2018:06:27 16:21:40",
            flash: "Flash did not fire, auto"
        }

        const jsonDummy3 = {
            reference: "12",
            objects_coordinates: [
                    [
                        1773,
                        863,
                        3582,
                        1383
                    ]
                ],
            objects: [
            "table"
            ],
            source: "faker",
            type: "objects"
        }

        const panes = [
            { menuItem: 'location', render: () => <ReactJson src={jsonDummy1} enableClipboard={false} displayObjectSize={false} displayDataTypes={false} theme={theme}/> },
            { menuItem: 'exif', render: () => <ReactJson src={jsonDummy2} enableClipboard={false} displayObjectSize={false} displayDataTypes={false} theme={theme}/> },
            { menuItem: 'objects', render: () => <ReactJson src={jsonDummy3} enableClipboard={false} displayObjectSize={false} displayDataTypes={false} theme={theme}/> },
          ]

        return (
        <div>
            <Modal dimmer open={openImage} onClose={this.close} basic size='fullscreen'>
                <Modal.Content image>
                    <Image wrapped src={this.handlePath(reference, false)} />
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
                            <Image className='gridImage' src={this.handlePath(obj.reference, true)} alt={obj.type}/>
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