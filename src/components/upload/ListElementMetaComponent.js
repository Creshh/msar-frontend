import React from 'react';
import {Popup,Accordion,Icon,Loader,Divider,List,Progress, Segment, Header, Image, Button, Modal, Tab, Card, Message} from 'semantic-ui-react'
import {UploadStates} from '../../common/Constants'

export default class ListElementMetaComponent extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {status, metaFileName, values} = this.props

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
                                (status === UploadStates.UPLOAD_PENDING ?
                                    <Loader active inline size='mini'/> :
                                    <Icon name='delete' onClick={() => this.props.removeFile(metaFileName)}/>)) :
                            <span className='problemText'>{values.msg}</span>}
                    </List.Description>
                </List.Content>
            </List.Item>
        )
    }
}