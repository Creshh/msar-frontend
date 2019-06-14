import React from 'react';
import StackGrid, { transitions, easings } from 'react-stack-grid';
import {Popup, Image, Button, Modal, Tab, Message} from 'semantic-ui-react'
import ReactJson from 'react-json-view'
import QueryHandler from '../common/QueryHandler'
import {theme} from '../common/Constants'
import {CopyToClipboard} from 'react-copy-to-clipboard'

const transition = transitions.scaleDown;
const COPY_TEXT = 'Copy Link'

export default class ImageGridComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {open: false, reference: '', copyText: COPY_TEXT, showMsg: false}
        this.showImage = this.showImage.bind(this)
        this.showMeta = this.showMeta.bind(this)
        this.close = this.close.bind(this)
        this.onCopy = this.onCopy.bind(this)
        this.onFilesAdded = this.onFilesAdded.bind(this)
        this.clickUpload = this.clickUpload.bind(this)

        this.fileInputRef = React.createRef()
    }

    showImage(reference){
        this.setState({openImage: true, reference: reference})
    }

    showMeta(reference){
        const panes = []
        QueryHandler.getDocuments(reference)
            .then(docs => {
                for(let [key, list] of Object.entries(docs)) {
                    for (let doc of list) {
                        panes.push({menuItem: key + ' from ' + doc.source, render: () => <ReactJson src={doc} enableClipboard={false} displayObjectSize={false} displayDataTypes={false} theme={theme}/>})
                    }
                }
                this.setState({openMeta: true, reference: reference, panes: panes})
            })
    }

    onCopy(){
        this.setState({copyText: 'Copied!'})
    }  

    close(){
        this.setState({openImage: false, openMeta: false, reference: ''})
    }

    clickUpload(reference){
        this.setState({uploadRef: reference})
        this.fileInputRef.current.click()
    }

    onFilesAdded(e){
        const {uploadRef} = this.state
        const files = e.target.files;
        
        this.setState({success: false, msg: ''})
        
        // if(!file) {
        //     return {success: false, msg: 'Please upload a file.'}
        // }
        // if(file.size >= 50000000) {
        //     return {success: false, msg: 'File size exceeds limit of 50MB.'}
        // }
        
        QueryHandler.addDocument(files[0], uploadRef)
            .then(result => {
                this.setState({success: result.success, msg: result.msg, showMsg: true})
                setTimeout(() => {
                    this.setState({showMsg: false})
                }, result.success ? 3000 : 10000)
            })
    }

    render() {
        const image_array = this.props.images
        const {openImage, openMeta, reference, panes, copyText, showMsg, success, msg} = this.state
        
        return (
        <div>
             <input
                hidden
                ref={this.fileInputRef}
                className="FileInput"
                type="file"
                onChange={this.onFilesAdded}
            />

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
                                    
                                    <Popup inverted position='top center' size='tiny' trigger={
                                        <Button className='imageButton' color='black' icon='add' onClick={() => this.clickUpload(obj.reference)}/>

                                    } content='Add Metadata' /> {/*file code*/}
                                    
                                    <Popup inverted position='top center' size='tiny' trigger={
                                        <Button className='imageButton' color='black' icon='download' onClick={() => QueryHandler.downloadAsset(obj.reference)} />
                                    } content='Download Image' /> {/*upload*/}
                                    
                                    <Popup className='imageLabelPopup' inverted position='top center' size='tiny' trigger={
                                        <CopyToClipboard text={'http://localhost:8080/' + QueryHandler.getAsset(obj.reference, false)} onCopy={() => this.onCopy()}>            
                                            <Button className='imageButton' color='black' icon='linkify' />
                                        </CopyToClipboard>
                                    } content={copyText} onClose={() => this.setState({copyText: COPY_TEXT})}/> {/*share alternate*/}
                                    
                                </Button.Group>
                            </div>
                        </div>
                        ))}
            </StackGrid>

            <div className={showMsg ? 'messageBox' : 'messageBox hidden'}>
                <Message content={msg} positive={success} negative={!success}/>
            </div>

        </div>
        );
    }
}