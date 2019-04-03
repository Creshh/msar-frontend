import React from 'react';
import _ from 'lodash'
import { Button, Label } from 'semantic-ui-react'

export default class UploadComponent extends React.Component {

 
    
      render() {
        return (
            <div>
          <Label
    as="label"
    basic
    htmlFor="upload"
>
    <Button
        icon="upload"
        label={{
            basic: true,
            content: 'Select file(s)'
        }}
        labelPosition="right"
    />
    <input
        hidden
        id="upload"
        multiple
        type="file"
    />
</Label>
          </div>
        )
    }
}