import React from 'react';
import {Icon,Header} from 'semantic-ui-react'
import QueryHandler from '../common/QueryHandler'
import {UploadStates} from '../common/Constants'
import UploadButtonComponent from './upload/UploadButtonComponent'
import ListComponent from './upload/ListComponent';


export default class UploadComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {success: false, files: {}, status: UploadStates.CLEAR}
        this.onFilesAdded = this.onFilesAdded.bind(this)
        this.clickUpload = this.clickUpload.bind(this)
        this.onMetaJsonParsed = this.onMetaJsonParsed.bind(this)
        this.removeMetaFile = this.removeMetaFile.bind(this)
        this.upload = this.upload.bind(this)
        this.uploadMetaFiles = this.uploadMetaFiles.bind(this)
        this.clearUpload = this.clearUpload.bind(this)

        this.fileInputRef = React.createRef()
    }

    clearUpload(){
        this.setState({files: {}, status: UploadStates.CLEAR})
    }

    clickUpload(){
        const {status} = this.state
        switch (status){
            case UploadStates.READY:
                this.upload()    
                break
            case UploadStates.CLEAR:
            this.fileInputRef.current.click()
                break
            case UploadStates.FINISHED:
                this.clearUpload()
                break
        }
    }

    async upload(){
        this.setState({status: UploadStates.PENDING})
        const {files} = this.state

        for(const file of Object.values(files)){
            if(file.total > 0){
                const {success, msg, reference} = await QueryHandler.uploadFile(file.fileObj)
                file.success = success
                file.msg = msg
                if(success){
                    file.reference = reference
                    const result = await this.uploadMetaFiles(files, file.metaFiles, reference)
                    if(result === 0){
                        QueryHandler.removeAsset(reference)
                        file.success = false
                        file.msg = 'Did not upload because of no metadata!'
                    }
                    this.setState({files: files})
                }
            }
            file.finished = true
            this.setState({files: files})
        }
        this.setState({status: UploadStates.FINISHED})
    }

    async uploadMetaFiles(files, metaFiles, reference){
        let count = 0
        for(const metaFile of Object.values(metaFiles)){
            if(metaFile.upload){
                const result = await QueryHandler.addDocument(metaFile.fileObj, reference)
                metaFile.success = result.success
                metaFile.msg = result.msg
                if(result.success){
                    count++
                }
            }
            metaFile.finished = true
            this.setState({files: files})
        }
        return count
    }

    removeMetaFile(metaFileName){
        const {files} = this.state

        for(const file of Object.values(files)){
            if(Object.keys(file.metaFiles).includes(metaFileName)){
                delete file.metaFiles[metaFileName]
                file.total--
            }
        }

        this.setState({files: files})
    }

    onMetaJsonParsed(metaFileName, meta, fileObj){
        const {files} = this.state

        let reference = meta.reference.substring(meta.reference.replace(/\\/g, '/').lastIndexOf('/')+1); 

        let upload = true
        let msg
        for(const metaFile of Object.values(files[reference].metaFiles)){
            if(metaFile.type === meta.type && metaFile.source === meta.source){
                upload = false   
                msg = 'Duplicate entry - will be skipped!'
                break
            }
        }

        if(upload){
            files[reference].total++
        }

        files[reference].metaFiles[metaFileName] = {success: false, finished: false, upload: upload, msg: msg, type: meta.type, source: meta.source, fileObj: fileObj}
        this.setState({files: files})
    }

    onFilesAdded(e){
        const fileList = e.target.files;

        this.setState({files: {}, status: UploadStates.PENDING})

        let files = {}
        for(const file of fileList){
            if(file['type'].split('/')[0] === 'image'){
                files[file.name] = {
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

        this.setState({files: files})

        for(const file of fileList){
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