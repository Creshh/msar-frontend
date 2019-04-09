import React from 'react'
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
  } from 'semantic-ui-react'

export default class Mockup extends React.Component {

    constructor(props){
        super(props)
        this.state = { activeItem: 'search' }
        this.handleItemClick = this.handleItemClick.bind(this)
    }

    handleItemClick(e, { name }) {
        this.setState({ activeItem: name })
    }

    render() {

        const { activeItem } = this.state

        return (
            <div id='page'>
                <Segment vertical inverted className='segmentLanding'>
                    
                    <Menu className='mainMenu' inverted secondary pointing size='large'>
                            <Menu.Item header className='MenuText'>
                                MetadataSearchAndRetrieval
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
                    <Divider/>
                    <Container text textAlign='center' className='containerSearch'>
                            <Header id='landingH1'
                                as='h1'
                                content='Image Retrieval'
                                inverted
                            />
                            <Header id='landingH2'
                                as='h2'
                                content='Search for Exif Tags, Objects, Persons, Locations, ...'
                                inverted
                            />
                            <Search fluid input={{ fluid: true }} className='primarySearch'
                                size='big'
                                category
                            />
                    </Container>
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