import React from 'react';
import {Accordion,Icon, Header, Button, Message} from 'semantic-ui-react'
import ReactJson from 'react-json-view'
import QueryHandler from '../common/QueryHandler'
import {theme} from '../common/Constants'


export default class UploadComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {success: false, msg: '', showMsg: false, typeList: [], activeIndex: 0}
        this.onFilesAdded = this.onFilesAdded.bind(this)
        this.clickUpload = this.clickUpload.bind(this)
        this.getJsonView = this.getJsonView.bind(this)

        this.fileInputRef = React.createRef()
    }

    refreshTypes(){
        QueryHandler.getTypes()
        .then(types => {
            this.setState({typeList: types})
        })
        .catch(err => {
            console.log('______ERROR_________')
            console.log(err)
        });
    }

    componentDidMount(){
        this.refreshTypes()
    }

    clickUpload(){
        this.fileInputRef.current.click()
    }

    onFilesAdded(e){
        const files = e.target.files;
        console.log('onfilesadded')
        this.setState({success: false, msg: ''})

        QueryHandler.addType(files[0])
            .then(result => {
                if(result.success){
                    this.refreshTypes()
                }
                this.setState({success: result.success, msg: result.msg, showMsg: true})
                setTimeout(() => {
                    this.setState({showMsg: false})
                }, result.success ? 3000 : 10000)
            })
    }

    getJsonView(json){
        return <ReactJson src={json} enableClipboard={false} displayObjectSize={false} displayDataTypes={false} theme={theme}/>
    }

    render() {
        const {showMsg, success, msg, typeList} = this.state
        
        const panels = Object.keys(typeList).map(key => (
            {
                key: key,
                title: {
                    content: key
                },
                content: {
                    content: this.getJsonView(typeList[key])
                }
            }
        ))
        
        return (
            <div>
                <input
                    hidden
                    ref={this.fileInputRef}
                    className="FileInput"
                    type="file"
                    onChange={this.onFilesAdded}
                />

                <div className='schemaContainer'>
                    <Header as='h3' icon textAlign='center'>
                        <Icon name='file code outline' />
                        JSON Schemes
                        <Header.Subheader>View or add JSON Schemes to validate metadata structures</Header.Subheader>
                    </Header>

                    <Accordion fluid styled defaultActiveIndex={-1} panels={panels}/>
                    <Button attached='bottom' className='imageButton' color='black' icon='add' onClick={() => this.clickUpload()}/>
                </div>


                <div className={showMsg ? 'messageBox' : 'messageBox hidden'}>
                    <Message content={msg} positive={success} negative={!success}/>
                </div>

            </div>
        );
    }
}