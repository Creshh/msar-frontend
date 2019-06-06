import React from 'react';
import {Input,Icon, Button, Label, Segment, Divider, Popup } from 'semantic-ui-react'
import {DatesRangeInput} from 'semantic-ui-calendar-react';

import QueryHandler from '../common/QueryHandler'

function LabelComponent(props){

    return (
        <Label color={props.add ? 'green' : 'red'} className='searchLabel'>
            {props.value} {props.range ? ' - ' + props.range : ''}
            <Label.Detail>[{props.field}]</Label.Detail>
            <Icon name='delete' onClick={(e, data) => (props.onClick(props.labelKey))}/>
        </Label>
    )
}

// function ValueInput(props){
//     <Input 
//     value={inputValue}
//     placeholder={range ? 'from ...' : 'Value'} 
//     onChange={(e, data) => (this.setState({inputValue: data.value}))}/>

// {range ? 
//     <Input placeholder='... to' 
//         onChange={(e, data) => (this.setState({inputRange: data.value}))}/> : ''
// }
// }

const example = {housenumber_34: {field: 'housenumber', value: '34', range: '69', add: false}, city_Dresden: {field: 'city', value: 'Dresden', add: false}, streetBahnhofstraße: {field: 'street', value: 'Bahnhofstraße', add: true}}

export default class FilterComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            results: [],
            fields: [],
            selected: '',
            inputRange: '',
            inputValue: '',
            dateValue: '',
            tags: example
        }
        this.handleFieldChanged = this.handleFieldChanged.bind(this)
        this.isRange = this.isRange.bind(this)
        this.isDate = this.isDate.bind(this)
        this.clickLabel = this.clickLabel.bind(this)
        this.addTag = this.addTag.bind(this)
    }

    componentDidMount(){
        QueryHandler.getFields().then(fields => (
            this.setState({fields: fields})
        ))
    }

    handleFieldChanged(e, data){
        // TODO: check if value is in fields list
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

    isDate(fieldName){
        const {fields} = this.state
        for(const field of fields){
            if(field.name === fieldName){
                return (field.datatype === 'date')
            }
        }
        return false;
    }

    clickLabel(key){
        const {tags} = this.state
        delete tags[key]

        this.setState({tags: tags})
    }

    addTag(e, data){
        const {tags, inputValue, inputRange, selected, dateValue} = this.state
        if(dateValue){
            const dates = dateValue.trim().split('-')
            tags[selected + dateValue.trim()] = {field: selected, value: dates[0], range: dates[1], add: data['positive'] ? true : false}
        } else {
            tags[selected + inputValue] = {field: selected, value: inputValue, range: inputRange, add: data['positive'] ? true : false}
        }
        this.setState({tags: tags, inputRange: '', inputValue: '', selected: ''})
    }

    
      render() {
        const {fields, selected, tags, inputValue, inputRange, dateValue} = this.state
        console.log(dateValue)
        const range = this.isRange(selected)
        const date = this.isDate(selected)
        return (
            <div className='secondarySearch'>
                        <datalist id='fieldList'>
                            {fields.map(field => (
                                <option key={field.name} value={field.name} />
                            ))}
                        </datalist>

                        <Input
                            value={selected}
                            placeholder='Field'
                            list='fieldList'
                            onChange={this.handleFieldChanged}
                        />

                        {date ? 
                        <DatesRangeInput  
                            name="datesRange"
                            allowSameEndDate
                            closable
                            placeholder="From - To"
                            dateFormat='DD.MM.YY'
                            value={this.state.dateValue}
                            iconPosition="left"
                            onChange={(e, data) => (this.setState({dateValue: data.value}))}/>
                        : 
                        range ? 
                        <span>
                        <Input 
                            value={inputValue}
                            placeholder={range ? 'from ...' : 'Value'} 
                            onChange={(e, data) => (this.setState({inputValue: data.value}))}/>
                        
                        <Input placeholder='... to' 
                                onChange={(e, data) => (this.setState({inputRange: data.value}))}/>
                                </span>
                        :
                        <Input 
                            value={inputValue}
                            placeholder={range ? 'from ...' : 'Value'} 
                            onChange={(e, data) => (this.setState({inputValue: data.value}))}/>
                        
                            }
                                
                        <Button.Group floated='right'> <Button icon='add' positive onClick={this.addTag}/><Button.Or /><Button icon='minus' negative onClick={this.addTag}/></Button.Group>

                        <div className='tagList'>
                            <Popup content='Clear all filters' trigger={
                                <Button circular icon='trash' />
                            } />
                            {Object.keys(tags).map(key => (
                                <LabelComponent
                                    key={key}
                                    labelKey={key}
                                    field={tags[key].field}
                                    value={tags[key].value}
                                    range={tags[key].range}
                                    add={tags[key].add}
                                    onClick={this.clickLabel}/>
                            ))}
                            
                        </div>
          </div>
        )
    }
}