import React from 'react';
import {Icon,Loader,List,Progress} from 'semantic-ui-react'
import {UploadStates} from '../../common/Constants'
import ListElementMetaComponent from './ListElementMetaComponent';

const STATE = {
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    READY: 'READY'
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
            case STATE.READY:
                    return (
                        ''
                    )
        }
}

function ListDescriptionComponent(props){
    const {msg, totalValue, currentValue} = props
    
    if(msg){
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

        if(finished || status === UploadStates.FINISHED){
            if(total > 0 && assetSuccess)
                ownState = STATE.SUCCESS
            else
                ownState = STATE.ERROR
        }
        else if(status === UploadStates.PENDING){
            ownState = STATE.PENDING
        } else {
            ownState = STATE.READY
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
                            key={metaFileName}
                            status={status}
                            metaFileName={metaFileName}
                            values={metaFileMap[metaFileName]}
                            removeFile={(metaFileName => (this.props.removeMetaFile(metaFileName)))}
                            />
                        ))}
                </List.List>
                <List.Description>
                    <ListDescriptionComponent msg={msg} totalValue={total} currentValue={value} />
                </List.Description>
            </List.Content>
        </List.Item>
        )
    }
}