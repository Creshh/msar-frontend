import React from 'react'
import {DatesRangeInput} from 'semantic-ui-calendar-react'
import {
    Accordion, Input, Label, Icon, Divider
  } from 'semantic-ui-react'

export default class FilterComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {datesRange: ''}
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event, {name, value}) {
        if (this.state.hasOwnProperty(name)) {
          this.setState({ [name]: value });
        }
    }

    render() {

        const panels = [4]

        panels[0] = {
            key: 'tags',
            title: 'Manual Tags',
            content: {
                content: 
                <div className='filter'>
                    <Input fluid label='AddTag'/>
                    <Label.Group color='olive'>
                        <Label as='a'>
                            Foo
                            <Icon name='close' />
                        </Label>
                        <Label as='a'>
                            Bar
                            <Icon name='close' />
                        </Label>
                </Label.Group>
                </div>
            }
        }

        panels[1] = {
            key: 'exif',
            title: 'EXIF',
            content: {
                content:
                <div className='filter'>
                    <Input fluid label='Width' />
                    <Input fluid label='Height' />
                    <DatesRangeInput
                        icon= {false}
                        name='datesRange'
                        placeholder='From - To'
                        iconPosition="left"
                        value={this.state.datesRange}
                        onChange={this.handleChange}
                    />

                </div>
            }
        }

        panels[2] = {
            key: 'location',
            title: 'Location',
            content: {
                content:
                <div className='filter'>
                    <Input fluid label='Country'  />
                    <Input fluid label='City' />
                    <Input fluid label='Street' />
                    <Divider horizontal>OR</Divider>
                    <Input fluid label='Latitude' />
                    <Input fluid label='Longitude' />
                    <Input fluid label='Radius' />
                </div>
            }
        }

        panels[3] = {
            key: 'persons',
            title: 'Persons',
            content: {
                content:
                <div className='filter'>
                    <Input fluid label='Persons' type='range' min={0} max={10}  />
                </div>
            }
        }

        return (
            <Accordion defaultActiveIndex={Array.from(Array(panels.length).keys())} panels={panels} exclusive={false} fluid />
        );
    }
}