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

const example = {housenumber34: {field: 'housenumber', lower: '34', upper: '69', add: false}, city_Dresden: {field: 'city', lower: 'Dresden', add: false}, streetBahnhofstraße: {field: 'street', lower: 'Bahnhofstraße', add: true}}

export default class FilterComponent extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            fields: [],
            selected: '',
            inputRange: '',
            inputValue: '',
            dateValue: '',
            tags: {},
        }
        this.handleFieldChanged = this.handleFieldChanged.bind(this)
        this.isRange = this.isRange.bind(this)
        this.isDate = this.isDate.bind(this)
        this.clickLabel = this.clickLabel.bind(this)
        this.addTag = this.addTag.bind(this)
        this.clearFilters = this.clearFilters.bind(this)
    }

    componentDidMount(){
        const {tags} = this.state
        QueryHandler.getFields().then(fields => (
            this.setState({fields: fields})
        ))

        if(this.props.defaultValue){
            tags[this.props.defaultValue] = {field: 'query', lower: this.props.defaultValue, upper: '', add: true}
        }
        this.setState({tags: tags})
        this.props.onTagsChanged(tags)
    }

    handleFieldChanged(e, data){
        // TODO: check if value is in fields list
        this.setState({selected: data.value})
    }

    clearFilters(e){
        this.setState({tags : {}})
        this.props.onTagsChanged({})
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
        this.props.onTagsChanged(tags)
    }

    addTag(e, data){
        const {tags, inputValue, inputRange, selected, dateValue} = this.state
        if(dateValue){
            const dates = dateValue.trim().split('-')
            tags[selected + dateValue.trim()] = {field: selected, lower: dates[0], upper: dates[1], add: data['positive'] ? true : false}
        } else {
            tags[selected + inputValue] = {field: selected, lower: inputValue, upper: this.isRange(selected) ? inputRange : '', add: data['positive'] ? true : false}
        }
        this.setState({tags: tags, inputRange: '', inputValue: '', selected: '', dateValue: ''})
        this.props.onTagsChanged(tags)
    }

    
      render() {
        const {fields, selected, tags, inputValue, inputRange, dateValue} = this.state
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
                            onChange={(e, data) => (this.setState({dateValue: data.value, inputValue: '', inputRange: ''}))}/>
                        : 
                        range ? 
                        <span>
                        <Input 
                            value={inputValue}
                            placeholder={range ? 'from ...' : 'Value'} 
                            onChange={(e, data) => (this.setState({inputValue: data.value, dateValue: ''}))}/>
                        
                        <Input placeholder='... to' 
                                onChange={(e, data) => (this.setState({inputRange: data.value, dateValue: ''}))}/>
                                </span>
                        :
                        <Input 
                            value={inputValue}
                            placeholder={range ? 'from ...' : 'Value'} 
                            onChange={(e, data) => (this.setState({inputValue: data.value, inputRange: '', dateValue: ''}))}/>
                        
                            }
                                
                        <Button.Group floated='right'> <Button icon='add' positive onClick={this.addTag}/><Button.Or /><Button icon='minus' negative onClick={this.addTag}/></Button.Group>

                        <div className='tagList'>
                            <Popup content='Clear all filters' trigger={
                                <Button circular icon='trash' onClick={this.clearFilters}/>
                            } />
                            {Object.keys(tags).map(key => (
                                <LabelComponent
                                    key={key}
                                    labelKey={key}
                                    field={tags[key].field}
                                    value={tags[key].lower}
                                    range={tags[key].upper}
                                    add={tags[key].add}
                                    onClick={this.clickLabel}/>
                            ))}
                            
                        </div>
          </div>
        )
    }
}