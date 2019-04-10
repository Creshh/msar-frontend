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

    // handleSidebarClick(e, titleProps) {
    //     console.log('sidebar click');
        
    //     const { index } = titleProps
    //     console.log(index)
    //     const { activeItem, activeIndex } = this.state
    //     const filtered = activeIndex.filter((value) => {return value == index})
    //     // const newIndex = activeIndex === index ? -1 : index
    //     console.log(filtered)
    //     this.setState({ activeIndex: filtered })
    //   }

    render() {

        const { activeItem, activeIndex } = this.state

        // const panels = _.times(3, i => ({
        //     key: `panel-${i}`,
        //     title: `title-${i}`,
        //     content: `content-${i}`,
        //   }))
        const panels = [3]

        panels[0] = {
            key: 'tags',
            title: 'Manual Tags',
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
                </div>,
        }

        panels[1] = {
            key: 'exif',
            title: 'EXIF',
            content:
                <div className='filter'>
                    <Input fluid label='Width' />
                    <Input fluid label='Height' />
                    <Input fluid label='Persons' type='range' min={0} max={10}  /> 
                </div>,
        }

        panels[2] = {
            key: 'location',
            title: 'Location',
            content:
                <div className='filter'>
                    <Input fluid label='Country'  />
                    <Input fluid label='City' />
                    <Input fluid label='Street' />
                    <Divider horizontal>OR</Divider>
                    <Input fluid label='Latitude' />
                    <Input fluid label='Longitude' />
                    <Input fluid label='Radius' />
                </div>,
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

                    <Sidebar.Pushable as={Segment}>
                            <Sidebar
                                as={Accordion}
                                animation='push'
                                icon='labeled'
                                exclusive={false}
                                onHide={this.handleSidebarHide}
                                visible={true}
                                // width=''
                                fluid
                            >
                                {/* <Accordion.Title active={true} index={0} onClick={this.handleSidebarClick}>
                                <Icon name='dropdown' />
                                What is a dog?
                                </Accordion.Title>
                                <Accordion.Content active={true}>
                                <p>
                                    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can
                                    be found as a welcome guest in many households across the world.
                                </p>
                                </Accordion.Content> */}
                                
                                
                                <Accordion defaultActiveIndex={Array.from(Array(panels.length).keys())} panels={panels} exclusive={false} fluid />
                            </Sidebar>

                            <Sidebar.Pusher>
                                <Segment basic>
                                <Header as='h3'>Application Content</Header>
                                    blablubb
                                </Segment>
                            </Sidebar.Pusher>
                        </Sidebar.Pushable>
                            
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