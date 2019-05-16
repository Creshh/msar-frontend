import React from 'react';
import {Popup,Accordion,Icon,Loader,Divider,List,Progress, Segment, Header, Image, Button, Modal, Tab, Card, Message} from 'semantic-ui-react'
import ReactJson from 'react-json-view'
import QueryHandler from '../common/QueryHandler'
import {theme} from '../common/Constants'

const UPLOAD_PENDING = 'UPLOAD_PENDING'
const UPLOAD_READY = 'UPLOAD_READY'
const UPLOAD_FINISHED = 'UPLOAD_FINISHED'
const UPLOAD_CLEAR = 'UPLOAD_CLEAR'

const fileMap1 = {
    '2A5A3100aJM.jpg': {
        'success': true,
        'metaFiles': {
            '2A5A3100aJM_objects.json': false,
            '2A5A3100aJM_exif.json': false,
            '2A5A3100aJM_location.json': true,
        },
        'reference': 312,
        'finished': false
    },
    'IMG_0139aJM.jpg': {
        'success': true,
        'metaFiles': {
            'IMG_0139aJM_objects.json': true,
            'IMG_0139aJM_exif.json': true,
            'IMG_0139aJM_location.json': true,
        },
        'reference': 313,
        'finished': true
    },
    'DSC_9393.jpg': {
        'success': false,
        'metaFiles': {
            'DSC_9393_objects.json': false,
            'DSC_9393_exif.json': false,
            'DSC_9393_location.json': false,
        },
        'reference': -1,
        'finished': false
    },
}

export default class UploadComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {success: false, msg: '', showMsg: false}
        this.onFilesAdded = this.onFilesAdded.bind(this)
        this.clickUpload = this.clickUpload.bind(this)
        this.createListItem = this.createListItem.bind(this)
        this.createSubListItem = this.createSubListItem.bind(this)

        this.fileInputRef = React.createRef()
    }

    clickUpload(){
        this.fileInputRef.current.click()
    }


    createListItem(assetFileName, assetSuccess, metaFileMap){
        const total = Object.keys(metaFileMap).length
        let value = 0

        for(const metaFileName of Object.keys(metaFileMap)){
            if(metaFileMap[metaFileName]){
                value += 1
            }
        }

        return (
            <List.Item key={assetFileName}>
                <List.Icon name='image' size='large'/>
                <List.Content>
                    <List.Header>{assetFileName} {assetSuccess ? <Icon name='check' /> : <Loader active inline size='tiny'/>}</List.Header>
                    <List.List>
                        {Object.keys(metaFileMap).map(metaFileName => (this.createSubListItem(metaFileName, metaFileMap[metaFileName])))}
                    </List.List>
                    <List.Description><Progress size='small' total={total} value={value} progress='ratio' autoSuccess/></List.Description>
                </List.Content>
            </List.Item>
        )
    }

    createSubListItem(metaFileName, success){
        return (
            <List.Item key={metaFileName}>
                <List.Icon name='file'/>
                <List.Content>
                    <List.Description>{metaFileName} {success ? <Icon name='check' /> : <Loader active inline size='mini'/>}</List.Description>
                </List.Content>
            </List.Item>
        )
    }


    onFilesAdded(e){
        const files = e.target.files;
        console.log(files)

        this.setState({files: {}, success: false, msg: ''})
        // build fileMap
        
        // maybe call API to check files and get map back with information (already there, error, missing etc), resolve warnings and then upload remaining elements -> problem: need to upload files twice?!
        // solution -> check offline; upload all (already exisiting metadata will be uploaded to new reference image, also if its the same)
        // check for: duplicates (type, source, version), no image for metadata file, no metadata for image; add them to separate "problem" list and show them
        // when adding metadata to existing image check type, source, version and add it only when one differs
        // when uploading iterate through fileMap and add them as asset -> get id back from mysqlDB; look for jsons with same name and add them with addDocument and given reference


        let fileMap = {}
        for(const file of files){
            if(file['type'].split('/')[0] === 'image'){
                fileMap[file.name.split('.')[0]] = {
                    'success': false,
                    'reference': -1,
                    'finished': false,
                    'metaFiles': {
                       
                    },
                }
            }
        }

        // set fileMap to state

        for(const file of files){
            if(file['type'] === 'application/json'){


                let fr = new FileReader()
                fr.onload = ev => (console.log(JSON.parse(ev.target.result))) // in function get filemap from state and add metadata values to filemap; add others with no reference to error map in state
                fr.readAsText(file)
                console.log('test')
    
            }
        }
        
        // QueryHandler.addDocument(files[0], uploadRef)
        //     .then(result => {
        //         this.setState({success: result.success, msg: result.msg, showMsg: true})
        //         setTimeout(() => {
        //             this.setState({showMsg: false})
        //         }, result.success ? 3000 : 10000)
        //     })
    }

    render() {
        const {showMsg, success, msg} = this.state

        const fileMap = {}

        let disabled = true
        let icon = 'add'

        const uploadState = UPLOAD_CLEAR
        switch (uploadState){
            case UPLOAD_CLEAR: 
                disabled = false
                icon = 'add'
                break
            case UPLOAD_READY:
                disabled = false
                icon = 'upload'
                break
            case UPLOAD_PENDING:
                disabled = true
                icon = 'upload'
                break
            case UPLOAD_FINISHED:
                disabled = false
                icon = 'redo alternate'
                break
        }

        



        
        
        return (
            <div>
                <input
                    hidden
                    multiple
                    ref={this.fileInputRef}
                    className="FileInput"
                    type="file"
                    onChange={this.onFilesAdded}
                />


                <div className='uploadContainer'>
                    <Header as='h3' icon textAlign='center'>
                        <Icon name='upload' />
                        Upload Assets
                        <Header.Subheader>Upload assets with additional metadata</Header.Subheader>
                    </Header>

                    <List divided relaxed className='fileList'>
                        {Object.keys(fileMap).map(fileName => this.createListItem(fileName, fileMap[fileName].success, fileMap[fileName].metaFiles))}
                    </List>

                    <Button disabled={disabled} attached='bottom' className='imageButton' color='black' icon={icon} onClick={() => this.clickUpload()} /> 
                    {/*change to upload icon after successfull iteration over files*/}

                </div>

                <div className={showMsg ? 'messageBox' : 'messageBox hidden'}>
                    <Message content={msg} positive={success} negative={!success}/>
                </div>

            </div>
        );
    }
}