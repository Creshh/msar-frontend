import React from 'react';
import {Button, Loader, Icon} from 'semantic-ui-react'
import {UploadStates} from '../../common/Constants'

export default class UploadButtonComponent extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {status} = this.props

        let pending = false
        let icon
        
        switch (status){
            case UploadStates.CLEAR: 
                icon = 'add'
                break
            case UploadStates.READY:
                icon = 'upload'
                break
            case UploadStates.PENDING:
                pending = true
                icon = 'upload'
                break
            case UploadStates.FINISHED:
                icon = 'redo alternate'
                break
        }
        
        return (
            <Button disabled={pending} attached='bottom' className='imageButton' color='black' onClick={() => this.props.clickUpload()} >
                {
                    pending ?
                    <Loader active inline inverted size='tiny'/> :
                    <Icon name={icon} />
                }
            </Button> 
        );
    }
}