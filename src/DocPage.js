import React from 'react'
import _ from 'lodash'
import {
    Segment,Divider, Header, List, Accordion
  } from 'semantic-ui-react'
import ReactJson from 'react-json-view'
import FooterComponent from './components/FooterComponent'
import MenuComponent from './components/MenuComponent'
import {theme} from './common/Constants'

export default class DocPage extends React.Component {

    render() {


        let schema = require('../dist/res/example_schema.json')
        const schema_example =[
            {
                key: 'Example json schema',
                title: {
                    content: 'Example json schema'
                },
                content: {
                    content: <ReactJson src={schema} enableClipboard={true} displayObjectSize={false} displayDataTypes={false} theme={theme}/>
                }
            }
        ]

        
        let doc = require('../dist/res/example_doc.json')
        const doc_example =[
            {
                key: 'Example json document',
                title: {
                    content: 'Example json document'
                },
                content: {
                    content: <ReactJson src={doc} enableClipboard={true} displayObjectSize={false} displayDataTypes={false} theme={theme}/>
                }
            }
        ]

        return (
            <div id='page'>
                <Segment vertical className='segmentDoc'>
                    <MenuComponent activeItem='doc'/>
                    <div className='docContainer'>
                        <Header as='h3'>
                            Documentation
                        </Header>
                        <Divider />

                        <Header as='h4'>
                            Search
                        </Header>
                        <List bulleted>
                            <List.Item>categorized free text search</List.Item>
                            <List.Item>shows field of documents which is queried with the entered search term</List.Item>
                            <List.Item>after free text search, additional filters can be provided for further fine tuning of the results</List.Item>
                            <List.Item>select field and specifiy value or range (based on field definition)</List.Item>
                            <List.Item>select + or - to show results containing the term or not containing the term</List.Item>
                            <List.Item>all filters are combined with and logic </List.Item>
                        </List>
                        <Header as='h4'>
                            Schema Format
                        </Header>
                        <List bulleted>
                            <List.Item>each document which should be entered and uploaded must comply with a json schema</List.Item>
                            <List.Item>a json schema defines the fields of the document type and their properties</List.Item>
                            <List.Item>the json schemas must comply to the json schema definition v7(<a href="https://json-schema.org/understanding-json-schema/index.html">json-schema.org</a>)</List.Item>
                            <List.Item>the following entries are mandatory for the header and each schema: 
                                <List.List>
                                    <List.Item>"title":"[type of the schema definition, will be entered in each document]"</List.Item>
                                    <List.Item>"description":"[description of the schema definiton]"</List.Item>
                                    <List.Item>"$id":"[unique schema id, like "https://tu-chemnitz.de/tomkr.meta.schema_title"]"</List.Item>
                                    <List.Item>"additionalProperties":false</List.Item>
                                    <List.Item>"type":"object"</List.Item>
                                    <List.Item>"properties": [json object containing the field definitions of the document</List.Item>
                                        <List.List>
                                            <List.Item>reference, id, description, type, source are mandatory and define the header of the document</List.Item>
                                            <List.Item>each further property json object defines a metadata field containing real data which can be configured for search
                                                <List.List>
                                                    <List.Item>"type": [datatype, e.g. "integer", "number" or "string"] (mandatory)</List.Item>
                                                    <List.Item>"searchType": [filter representation: "exact", "range" or "date", specifies the available input fields in the filter view of search (mandatory)</List.Item>
                                                    <List.Item>"suggest": [true or false] if not specified, defaults to false - defines if this field is queried in the free text search</List.Item>
                                                </List.List>
                                            </List.Item>
                                        </List.List>
                                    <List.Item>"required":[list of above defined properties which must be filled in in each document. All other fields are optional. Must include reference, id, type and source.</List.Item>
                                </List.List>
                            </List.Item>
                            
                        </List>

                        <Accordion fluid styled defaultActiveIndex={-1} panels={schema_example}/>

                        <Header as='h4'>
                            Document Format
                        </Header>
                        <List bulleted>
                            <List.Item>includes real data combined with fields for classification and assignment to images</List.Item>
                            <List.Item>header fields are reference (path to corresponding image), type (schema type) and source (source framework etc., cannot be filtered yet, so all sources are searched)</List.Item>
                            <List.Item>other fields are described by the selected schema and include the real data</List.Item>
                            <List.Item icon='exclamation' content='important: while uploading, the metadata files are matched with the image files using the reference inside the metadata file. It should contain the exact name of the image to which it belongs!'/>
                            <List.Item icon='exclamation' content='metadata files must be names like [image_filename]_[documenttype].json' />
                        </List>
                        
                        <Accordion fluid styled defaultActiveIndex={-1} panels={doc_example}/>
                        

                    </div>

                </Segment>

                <FooterComponent />
            </div>
        );
    }
}