import React from 'react'
import {
    Menu,
  } from 'semantic-ui-react'

export default class MenuComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = { activeItem: 'search' }
        this.handleItemClick = this.handleItemClick.bind(this)
    }

    handleItemClick(e, { name }) {
        this.setState({ activeItem: name })
    }

    render() {
        const {activeItem} = this.state
        const {inverted} = this.props

        return (
            <Menu className='mainMenu' inverted={inverted} secondary pointing size='large'>
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
        );
    }
}