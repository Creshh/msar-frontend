import React from 'react'
import {
    Container,
    Grid,
    Header,
    List,
    Segment,
  } from 'semantic-ui-react'

export default class FooterComponent extends React.Component {

    render() {
        return (
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
        );
    }
}