import React from 'react';
import {Icon,Header} from 'semantic-ui-react'
import QueryHandler from '../common/QueryHandler'
import {UploadStates} from '../common/Constants'
import UploadButtonComponent from './upload/UploadButtonComponent'
import ListComponent from './upload/ListComponent';


export default class UploadComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {success: false, msg: '', showMsg: false, files: {}, status: UploadStates.CLEAR}
        this.onFilesAdded = this.onFilesAdded.bind(this)
        this.clickUpload = this.clickUpload.bind(this)
        this.onMetaJsonParsed = this.onMetaJsonParsed.bind(this)
        this.removeMetaFile = this.removeMetaFile.bind(this)
        this.upload = this.upload.bind(this)
        this.uploadMetaFiles = this.uploadMetaFiles.bind(this)

        this.fileInputRef = React.createRef()
    }

    clickUpload(){
        const {status} = this.state
        if(status === UploadStates.READY){
            this.upload()
        } else if (status === UploadStates.CLEAR){
            this.fileInputRef.current.click()
        }
    }

    upload(){
        this.setState({status: UploadStates.PENDING})
        const {files} = this.state
        console.log(files)

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

    removeMetaFile(metaFileName){
        const {files} = this.state

        for(const fileName of Object.keys(files)){
            if(Object.keys(files[fileName].metaFiles).includes(metaFileName)){
                delete files[fileName].metaFiles[metaFileName]
            }
        }

        this.setState({files: files})
    }

    onMetaJsonParsed(filename, meta, fileObj){
        const {files} = this.state

        const reference = meta.reference
        const source = meta.source
        const type = meta.type

        let baseReference =  ''
        if(reference.includes('/')){
            baseReference = reference.substring(reference.lastIndexOf('/')+1).split('.')[0];
        } else if(reference.includes('\\')){
            baseReference = reference.substring(reference.lastIndexOf('\\')+1).split('.')[0];
        }

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
        this.setState({files: files})
    }

    onFilesAdded(e){
        const files = e.target.files;

        this.setState({files: {}, status: UploadStates.PENDING, success: false, msg: ''})

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
        this.setState({status: UploadStates.READY})
    }

    render() {
        const {status, files} = this.state

        return (
            <div>
                <input hidden multiple ref={this.fileInputRef} className="FileInput" type="file" onChange={this.onFilesAdded} />

                <div className='uploadContainer'>
                    <Header as='h3' icon textAlign='center'>
                        <Icon name='upload' />
                        Upload Assets
                        <Header.Subheader>Upload assets with additional metadata</Header.Subheader>
                    </Header>

                    <ListComponent status={status} files={files} removeMetaFile={metaFileName => (this.removeMetaFile(metaFileName))}/>

                    <UploadButtonComponent status={status} clickUpload={() => (this.clickUpload())}/>
                </div>
            </div>
        );
    }
}