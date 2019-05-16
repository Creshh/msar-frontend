import React from 'react';
import {Popup,Accordion,Icon,Divider,List,Progress, Segment, Header, Image, Button, Modal, Tab, Card, Message} from 'semantic-ui-react'
import ReactJson from 'react-json-view'
import QueryHandler from '../common/QueryHandler'
import {theme} from '../common/Constants'


export default class UploadComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {success: false, msg: '', showMsg: false}
        this.onFilesAdded = this.onFilesAdded.bind(this)
        this.clickUpload = this.clickUpload.bind(this)

        this.fileInputRef = React.createRef()
    }

    clickUpload(){
        this.fileInputRef.current.click()
    }

    onFilesAdded(e){
        const files = e.target.files;
        console.log(files)

        
        this.setState({success: false, msg: ''})
        
        // if(!file) {
        //     return {success: false, msg: 'Please upload a file.'}
        // }
        // if(file.size >= 50000000) {
        //     return {success: false, msg: 'File size exceeds limit of 50MB.'}
        // }
        
        // iterate through images and add them as asset -> get id back from mysqlDB; look for jsons with same name and add them with addDocument and given reference
        // error when: no metadata file found for image
        // warning when metadata files without image

        // add types also on this page
        // show schema also on this page

        QueryHandler.addDocument(files[0], uploadRef)
            .then(result => {
                this.setState({success: result.success, msg: result.msg, showMsg: true})
                setTimeout(() => {
                    this.setState({showMsg: false})
                }, result.success ? 3000 : 10000)
            })
    }

    render() {
        const {showMsg, success, msg} = this.state
        
        return (
            <div>
                <input
                    hidden
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
                        <List.Item>
                            <List.Icon name='image' size='large'/>
                            <List.Content>
                                <List.Header>2A5A3100aJM.jpg</List.Header>
                                <List.Description><Progress active size='small' total='3' value='2' progress='ratio'/></List.Description>
                                <List.List>
                                    <List.Item>
                                        <List.Icon name='file'/>
                                        <List.Content>
                                            <List.Description>2A5A3100aJM_objects.json  </List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='file'/>
                                        <List.Content>
                                            <List.Description>2A5A3100aJM_exif.json </List.Description>
                                        </List.Content>
                                    </List.Item>
                                </List.List>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='image' size='large'/>
                            <List.Content>
                                <List.Header>IMG_0139aJM.jpg</List.Header>
                                <List.Description>...</List.Description>
                                <List.List>
                                    <List.Item>
                                        <List.Icon name='file'/>
                                        <List.Content>
                                            <List.Description>IMG_0139aJM_objects.json</List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='file'/>
                                        <List.Content>
                                            <List.Description>IMG_0139aJM_exif.json</List.Description>
                                        </List.Content>
                                    </List.Item>
                                </List.List>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='image' size='large'/>
                            <List.Content>
                                <List.Header>DSC_9393.jpg</List.Header>
                                <List.Description>...</List.Description>
                                <List.List>
                                    <List.Item>
                                        <List.Icon name='file'/>
                                        <List.Content>
                                            <List.Description>DSC_9393_location.json</List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='file'/>
                                        <List.Content>
                                            <List.Description>DSC_9393_exif.json</List.Description>
                                        </List.Content>
                                    </List.Item>
                                </List.List>
                            </List.Content>
                        </List.Item>
                    </List>

                    <Button disabled attached='bottom' className='imageButton' color='black' icon='add' onClick={() => this.clickUpload()} /> 
                    {/*change to upload icon after successfull iteration over files*/}

                </div>

                <div className={showMsg ? 'messageBox' : 'messageBox hidden'}>
                    <Message content={msg} positive={success} negative={!success}/>
                </div>

            </div>
        );
    }
}