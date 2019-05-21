import React from 'react';
import {Popup,Accordion,Icon,Loader,Divider,List,Progress, Segment, Header, Image, Button, Modal, Tab, Card, Message} from 'semantic-ui-react'
import {UploadStates} from '../../common/Constants'
import ListElementMetaComponent from './ListElementMetaComponent';

const STATE = {
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
}

function ListHeaderComponent(props){
        const {ownState} = props
        
        switch (ownState){
            case STATE.PENDING:
                return (
                    <Loader active inline size='tiny'/>
                )
            case STATE.SUCCESS:
                return (
                    <Icon name='check' />
                )
            case STATE.ERROR:
                return (
                    <Icon name='exclamation' />
                )
        }
}

function ListDescriptionComponent(props){
    const {problem, msg, totalValue, currentValue} = props
    
    if(problem){
        return (
            <div className='problemText'>{msg}</div>
        )   
    } else {
        return (
            <Progress size='small' total={totalValue} value={currentValue} progress='ratio' autoSuccess/>
        )
    }
    
}

export default class ListElementAssetComponent extends React.Component {

    constructor(props) {
        super(props)
    }


    render() {
        let {status, assetFileName, assetSuccess, metaFileMap, total, finished, msg} = this.props
        let value = 0

        for(const metaFileName of Object.keys(metaFileMap)){
            if(metaFileMap[metaFileName].success){
                value += 1
            }
        }
        
        let ownState = ''
        if(status === UploadStates.UPLOAD_PENDING){
            ownState = STATE.PENDING
        } else {
            if(total > 0 && assetSuccess)
                ownState = STATE.SUCCESS
            else
                ownState = STATE.ERROR
        }

        if(total === 0){
            msg = 'No metafiles attached - will be skipped!'
        }

        return (
            <List.Item key={assetFileName}>
            <List.Icon name='image' size='large'/>
            <List.Content>
                <List.Header>
                    {assetFileName}
                    <ListHeaderComponent ownState={ownState} />
                </List.Header>
                <List.List>
                    {Object.keys(metaFileMap).map(metaFileName => (
                        <ListElementMetaComponent 
                            metaFileName={metaFileName}
                            metaFileMap={metaFileMap[metaFileName]}
                            removeMetaFile={(metaFileName => (this.props.removeFile(metaFileName)))}
                            />
                        ))}
                </List.List>
                <List.Description>
                    <ListDescriptionComponent problem={msg} msg={msg} totalValue={total} currentValue={value} />
                </List.Description>
            </List.Content>
        </List.Item>
        )
    }
}