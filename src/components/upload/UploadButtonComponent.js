import React from 'react';
import {Button} from 'semantic-ui-react'
import {UploadStates} from '../../common/Constants'

export default class UploadButtonComponent extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {status} = this.props

        let disabled = false
        let icon
        
        switch (status){
            case UploadStates.UPLOAD_CLEAR: 
                icon = 'add'
                break
            case UploadStates.UPLOAD_READY:
                icon = 'upload'
                break
            case UploadStates.UPLOAD_PENDING:
                disabled = true
                icon = 'upload'
                break
            case UploadStates.UPLOAD_FINISHED:
                icon = 'redo alternate'
                break
        }
        
        return (
            <Button disabled={disabled} attached='bottom' className='imageButton' color='black' icon={icon} onClick={() => this.props.clickUpload()} /> 
        );
    }
}