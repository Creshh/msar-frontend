import React from 'react';
import _ from 'lodash'
import { Search, Input,Icon, Button, Label, Popup, Segment } from 'semantic-ui-react'

import QueryHandler from '../common/QueryHandler'


export default class SearchComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            results: [],
            value: this.props.defaultValue,
            fields: [],
            selected: ''
        }
        this.handleFieldChanged = this.handleFieldChanged.bind(this)
        this.isRange = this.isRange.bind(this)
    }

    componentDidMount(){
        QueryHandler.getFields().then(fields => (
            this.setState({fields: fields})
        ))
    }

    handleFieldChanged(e, data){
        // check if value is in fields list
        this.setState({selected: data.value})
    }

    isRange(fieldName){
        const {fields} = this.state
        for(const field of fields){
            if(field.name === fieldName){
                return (field.datatype === 'range')
            }
        }
        return false;
    }

    
      render() {
        const {fields, selected} = this.state
        const range = this.isRange(selected)
        return (
            <div>
                  <Segment.Group>
                <Segment >

                <datalist id='fieldList'>
                    {fields.map(field => (<option key={field.name} value={field.name} />))}
                </datalist>

                <Input
                    placeholder='Field'
                    list='fieldList'
                    onChange={this.handleFieldChanged}
                />

                <Input placeholder={range ? 'from ...' : 'Value'} />
                <Input placeholder='... to' />

                          
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