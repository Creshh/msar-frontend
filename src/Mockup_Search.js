import React from 'react'
import _ from 'lodash'
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Search,
    Segment,
    Sidebar,
    Visibility,
    Rail,
    Sticky,
    Accordion,
    Input,
    Label,
  } from 'semantic-ui-react'
  import GridComponent from './old_components/GridComponent'

export default class Mockup extends React.Component {

    constructor(props){
        super(props)
        this.state = { activeItem: 'search', activeIndex: []}
        this.handleItemClick = this.handleItemClick.bind(this)
        // this.handleSidebarClick = this.handleSidebarClick.bind(this)
    }

    handleItemClick(e, { name }) {
        this.setState({ activeItem: name })
    }

    render() {
        const images = []
        for(var i = 1; i<=50; i++){
            images.push({reference: i})
        }

        const { activeItem, activeIndex } = this.state
        const panels = [3]

        panels[0] = {
            key: 'tags',
            title: 'Manual Tags',
            content: {
                content: 
                <div className='filter'>
                    <Input fluid label='AddTag'/>
                    <Label.Group color='olive'>
                        <Label as='a'>
                            Fun
                            <Icon name='close' />
                        </Label>
                        <Label as='a'>
                            Fun
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
                    <Input fluid label='Persons' type='range' min={0} max={10}  /> 
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

        return (
            <div id='page'>
                <Segment vertical className='segmentSearch'>
                    <Menu className='mainMenu' secondary pointing size='large'>
                            <Menu.Item header className='MenuText'>
                                Metadata Search and Retrieval
                            </Menu.Item>
                            <Menu.Item
                                position='right' 
                                name='search'
                                active={activeItem === 'search'}
                                onClick={this.handleItemClick}>
                                    Search
                            </Menu.Item>
                            <Menu.Item
                                name='upload'
                                active={activeItem === 'upload'}
                                onClick={this.handleItemClick}>
                                    Upload
                            </Menu.Item>
                    </Menu>
                    {/* <Divider/> */}

                    <Search input={{ fluid: true }} className='secondarySearch'
                        size='small'
                        category
                    />

                    {/* <Sidebar.Pushable as={Segment}>
                            <Sidebar
                                animation='push'
                                onHide={this.handleSidebarHide}
                                visible={true}
                                // width=''
                            >
                                
                                <Accordion defaultActiveIndex={Array.from(Array(panels.length).keys())} panels={panels} exclusive={false} fluid />
                            </Sidebar>

                            <Sidebar.Pusher>
                                <Segment basic>
                                <Header as='h3'>Application Content</Header>
                                <GridComponent
                                    images={images}
                                />
                                </Segment>
                            </Sidebar.Pusher>
                        </Sidebar.Pushable> */}
                    
                    <div className='grid'>
                        <div className= 'grid-filters'>
                            <Accordion defaultActiveIndex={Array.from(Array(panels.length).keys())} panels={panels} exclusive={false} fluid />
                        </div> 
                        <Segment basic className='grid-images'>
                            <GridComponent
                                images={images}
                            />
                        </Segment>
                    </div>
                </Segment>


                <Segment inverted vertical className='segmentFooter'>
                    <Container>
                        <Grid divided inverted stackable columns='2'>
                        <Grid.Row>
                            <Grid.Column>
                            <Header inverted as='h4' content='Content' />
                            <List link inverted>
                                <List.Item as='a'>Citation</List.Item>
                                <List.Item as='a'>Search</List.Item>
                                <List.Item as='a'>Upload</List.Item>
                                <List.Item as='a'>Metadata Formats</List.Item>
                            </List>
                            </Grid.Column>
                            <Grid.Column>
                            <Header inverted as='h4' content='About' />
                            <List link inverted>
                                <List.Item>Metadata Search and Retrieval Application</List.Item>
                                <List.Item as='a'>Professur Media Computing</List.Item>
                                <List.Item as='a'>Technische Universität Chemnitz</List.Item>
                                <List.Item>2017</List.Item>
                            </List>
                            </Grid.Column>
                        </Grid.Row>
                        </Grid>
                    </Container>
                </Segment>
            </div>
        );
    }
}