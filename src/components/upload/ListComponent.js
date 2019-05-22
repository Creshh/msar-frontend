import React from 'react';
import {List} from 'semantic-ui-react'
import ListElementAssetComponent from './ListElementAssetComponent';


export default class ListComponent extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {status, files} = this.props

        return (
            <List divided relaxed className='fileList'>
                {Object.keys(files).map((fileName) => (
                    <ListElementAssetComponent
                        key={fileName}
                        status={status}
                        assetFileName={fileName + '.' + files[fileName].fileType}
                        assetSuccess={files[fileName].success}
                        metaFileMap={files[fileName].metaFiles}
                        total={files[fileName].total}
                        finished={files[fileName].finished}
                        msg={files[fileName].msg}
                        removeMetaFile={(metaFileName => (this.props.removeMetaFile(metaFileName)))}
                    />
                ))}
            </List>
        );
    }
}