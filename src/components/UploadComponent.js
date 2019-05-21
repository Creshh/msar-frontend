import React from 'react';
import {Popup,Accordion,Icon,Loader,Divider,List,Progress, Segment, Header, Image, Button, Modal, Tab, Card, Message} from 'semantic-ui-react'
import QueryHandler from '../common/QueryHandler'

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
        this.state = {success: false, msg: '', showMsg: false, files: {}, status: UPLOAD_CLEAR}
        this.onFilesAdded = this.onFilesAdded.bind(this)
        this.clickUpload = this.clickUpload.bind(this)
        this.createListItem = this.createListItem.bind(this)
        this.createSubListItem = this.createSubListItem.bind(this)
        this.onMetaJsonParsed = this.onMetaJsonParsed.bind(this)
        this.deleteFile = this.deleteFile.bind(this)
        this.upload = this.upload.bind(this)
        this.uploadMetaFiles = this.uploadMetaFiles.bind(this)

        this.fileInputRef = React.createRef()
    }

    clickUpload(){
        const {status} = this.state
        if(status === UPLOAD_READY){
            this.upload()
        } else if (status === UPLOAD_CLEAR){
            this.fileInputRef.current.click()
        }
    }

    upload(){
        this.setState({status: UPLOAD_PENDING})
        const {files} = this.state
        console.log(files)


        // TODO iterate through fileMap and add them as asset -> get id back from mysqlDB; add jsons with addDocument and given reference
        for(const file of Object.keys(files)){
            if(files[file].total > 0){
                QueryHandler.uploadFile(files[file].fileObj)
                    .then(result => {
                        const {success, msg, reference} = result
                        files[file].finished = true
                        files[file].success = success
                        files[file].msg = msg
                        if(success){
                            files[file].reference = reference
                            this.setState({files: files})
                            this.uploadMetaFiles(files, file, reference)
                                .then(result => {
                                    if(result === 0){
                                        QueryHandler.removeAsset(reference)
                                        files[file].success = false
                                        files[file].msg = 'Did not upload because of no metadata!'
                                        this.setState({files: files})
                                        console.log('remove asset')
                                    }
                                })
                        }
                    })
            }
        }
    }

    async uploadMetaFiles(files, fileName, reference){
        const metaFiles = files[fileName].metaFiles
        let success = 0
        for(const file of Object.keys(metaFiles)){
            if(metaFiles[file].upload){
                const result = await QueryHandler.addDocument(metaFiles[file].fileObj, reference)
                metaFiles[file].success = result.success
                metaFiles[file].msg = result.msg
                metaFiles[file].finished = true
                if(result.success){
                    success++
                }
                this.setState({files: files})
            } else {
                metaFiles[file].finished = true
                this.setState({files: files})
            }
        }
        return success
    }

    createListItem(assetFileName, assetSuccess, metaFileMap, total, finished, msg){
        const {status} = this.state
        let value = 0

        for(const metaFileName of Object.keys(metaFileMap)){
            if(metaFileMap[metaFileName].success){
                value += 1
            }
        }

        return (
            <List.Item key={assetFileName}>
                <List.Icon name='image' size='large'/>
                <List.Content>
                    <List.Header>
                        {assetFileName}
                        {total > 0 ? (assetSuccess ? <Icon name='check' /> : 
                            (status === UPLOAD_PENDING ? <Loader active inline size='tiny'/> : '')) : ''}
                        </List.Header>
                    <List.List>
                        {Object.keys(metaFileMap).map(metaFileName => (this.createSubListItem(metaFileName, metaFileMap[metaFileName])))}
                    </List.List>
                    <List.Description>
                        {total > 0 ? <Progress size='small' total={total} value={value} progress='ratio' autoSuccess/> : <div className='problemText'>No metafiles attached - will be skipped!</div>}
                    </List.Description>
                </List.Content>
            </List.Item>
        )
    }

    createSubListItem(metaFileName, values){

        const {status} = this.state

        return (
            <List.Item key={metaFileName}>
                <List.Icon name='file'/>
                <List.Content>
                    <List.Description>
                        {metaFileName}
                        {' [' + values.type + '|' + values.source + '] '}
                        {values.upload ? 
                            (values.finished ? 
                                (values.success ? 
                                    <Icon name='check' /> :
                                    <span className='problemText'>{values.msg}</span>) :
                                (status === UPLOAD_PENDING ?
                                    <Loader active inline size='mini'/> :
                                    <Icon name='delete' onClick={() => this.deleteFile(metaFileName)}/>)) :
                            <span className='problemText'>{values.msg}</span>}
                    </List.Description>
                </List.Content>
            </List.Item>
        )
    }

    deleteFile(metaFileName){
        const {files} = this.state

        for(const fileName of Object.keys(files)){
            if(Object.keys(files[fileName].metaFiles).includes(metaFileName)){
                delete files[fileName].metaFiles[metaFileName]
            }
        }

        this.setState({files: files})
    }

    // in function get filemap from state and add metadata values to filemap; add others with no reference to error map in state
    onMetaJsonParsed(filename, meta, fileObj){
        const {files} = this.state

        const reference = meta.reference
        const source = meta.source
        const type = meta.type
        // console.log(reference, source, type)

        let baseReference =  ''
        if(reference.includes('/')){
            baseReference = reference.substring(reference.lastIndexOf('/')+1).split('.')[0];
        } else if(reference.includes('\\')){
            baseReference = reference.substring(reference.lastIndexOf('\\')+1).split('.')[0];
        }

        // console.log(baseReference)
        let duplicate = false
        for(const metaFile of Object.keys(files[baseReference].metaFiles)){
            if(files[baseReference].metaFiles[metaFile].type === type && files[baseReference].metaFiles[metaFile].source === source){
                duplicate = true   
                break
            }
        }

        if(duplicate){
            files[baseReference].metaFiles[filename] = {success: false, finished: false, upload: false, msg: 'Duplicate entry - will be skipped!', type: type, source: source, fileObj: fileObj}
        } else {
            files[baseReference].total++
            files[baseReference].metaFiles[filename] = {success: false, finished: false, upload: true, msg: '', type: type, source: source, fileObj: fileObj}
        }
        // console.log(files)
        this.setState({files: files})
    }

    onFilesAdded(e){
        const files = e.target.files;
        //console.log(files)

        this.setState({files: {}, status: UPLOAD_PENDING, success: false, msg: ''})
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
                    'fileType': file.name.split('.')[1],
                    'fileObj': file,
                    'success': false,
                    'msg': '',
                    'reference': -1,
                    'finished': false,
                    'metaFiles': {},
                    'total': 0
                }
            }
        }

        this.setState({files: fileMap})

        for(const file of files){
            if(file['type'] === 'application/json'){
                const fr = new FileReader()
                fr.onload = ev => (this.onMetaJsonParsed(file.name, JSON.parse(ev.target.result), file))
                fr.readAsText(file)
            }
        }
        this.setState({status: UPLOAD_READY})
    }

    render() {
        const {showMsg, success, msg, status, files} = this.state

        let disabled = true
        let icon = 'add'

        switch (status){
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
                        {Object.keys(files).map(fileName => this.createListItem(fileName + '.' + files[fileName].fileType, files[fileName].success, files[fileName].metaFiles, files[fileName].total,  files[fileName].finished,  files[fileName].msg))}
                    </List>

                    <Button disabled={disabled} attached='bottom' className='imageButton' color='black' icon={icon} onClick={() => this.clickUpload()} /> 

                </div>

                <div className={showMsg ? 'messageBox' : 'messageBox hidden'}>
                    <Message content={msg} positive={success} negative={!success}/>
                </div>

            </div>
        );
    }
}