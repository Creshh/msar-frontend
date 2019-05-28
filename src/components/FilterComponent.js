import React from 'react';
import _ from 'lodash'
import { Search, Input,Icon, Button, Label, Popup, Segment } from 'semantic-ui-react'


export default class SearchComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            results: [],
            value: this.props.defaultValue
        }
    }

    
      render() {

        const number = true

        return (
            <div>
                  <Segment.Group>
                <Segment >
                <Input
                    placeholder='Field'
                    list='fields'
                />
                    <datalist id='fields'>
                    <option value='Objects' />
                    <option value='Street' />
                    <option value='City' />
                    </datalist>

                <Input
                    placeholder='Value'
                />

                {number ? 
                <Popup content='Optional, specify range end. Value equals range start' trigger={
                    <Input
                        placeholder='Range'
                />} /> : 
                    ''
                }
                
                 <Button.Group> <Button icon='add' positive/><Button.Or /><Button icon='minus' negative/></Button.Group>
                 
                 </Segment>
                     <Segment attached>
                    <Label color='green' className='searchLabel'>
                        Germany
                        <Label.Detail>[Country]</Label.Detail>
                        <Icon name='delete' />
                    </Label>
                    <Label color='red' className='searchLabel'>
                        Dresden
                        <Label.Detail>[City]</Label.Detail>
                        <Icon name='delete' />
                    </Label>
                    <Label color='green' className='searchLabel'>
                        Germany
                        <Label.Detail>[Country]</Label.Detail>
                        <Icon name='delete' />
                    </Label>
                    <Label color='red' className='searchLabel'>
                        Dresden
                        <Label.Detail>[City]</Label.Detail>
                        <Icon name='delete' />
                    </Label>
                    <Label color='red' className='searchLabel'>
                        Dresden
                        <Label.Detail>[City]</Label.Detail>
                        <Icon name='delete' />
                    </Label>
                    <Label color='green' className='searchLabel'>
                        Germany
                        <Label.Detail>[Country]</Label.Detail>
                        <Icon name='delete' />
                    </Label>
                    <Label color='red' className='searchLabel'>
                        Dresden
                        <Label.Detail>[City]</Label.Detail>
                        <Icon name='delete' />
                    </Label>
                    <Label color='red' className='searchLabel'>
                        Dresden
                        <Label.Detail>[City]</Label.Detail>
                        <Icon name='delete' />
                    </Label>
                    <Label color='green' className='searchLabel'>
                        Germany
                        <Label.Detail>[Country]</Label.Detail>
                        <Icon name='delete' />
                    </Label>
                    <Label color='red' className='searchLabel'>
                        Dresden
                        <Label.Detail>[City]</Label.Detail>
                        <Icon name='delete' />
                    </Label>
                    </Segment>
                    </Segment.Group>
          </div>
        )
    }
}