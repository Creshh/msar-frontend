import React from 'react';
import {Popup, Image, Button, Modal, Tab, Card, Message} from 'semantic-ui-react'
import ReactJson from 'react-json-view'
import QueryHandler from '../common/QueryHandler'


export default class UploadComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {success: false, msg: '', showMsg: false, typeList: []}
        this.onFilesAdded = this.onFilesAdded.bind(this)
        this.clickUpload = this.clickUpload.bind(this)

        this.fileInputRef = React.createRef()

    }

    componentDidMount(){
        QueryHandler.getTypes()
        .then(types => {
            console.log(types)
            this.setState({typeList: types})

            // for (let [key, value] of Object.entries(types)) {
            //     console.log(key)
            //     console.log(value)
            // }
        })
        .catch(err => {
            console.log('error')
            console.log(err)
          });
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
        const {showMsg, success, msg, typeList} = this.state
        


        return (
        <div>
             <input
                hidden
                ref={this.fileInputRef}
                className="FileInput"
                type="file"
                onChange={this.onFilesAdded}
            />

                                    
            <Button className='imageButton' color='black' icon='add' onClick={() => this.clickUpload()}/>
            {typeList.map(obj => (
                <Card>
                    <Card.Content header='About Amy' />
                    <Card.Content description>
                        <ReactJson src={obj} enableClipboard={false} displayObjectSize={false} displayDataTypes={false} theme={theme}/>
                    </Card.Content>
                    <Card.Content extra>
                    <Icon name='user' />
                    4 Friends
                    </Card.Content>
                </Card>
            ))}
            <div className={showMsg ? 'messageBox' : 'messageBox hidden'}>
                <Message content={msg} positive={success} negative={!success}/>
            </div>

        </div>
        );
    }
}