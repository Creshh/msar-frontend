import React from 'react'
import {Menu, Icon} from 'semantic-ui-react'
import {Link} from "react-router-dom";

export default class MenuComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = { activeItem: props.activeItem }
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
                    <Menu.Item as={Link}
                        to='/'
                        name='home'
                        header
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}>
                        Metadata Search and Retrieval
                    </Menu.Item>
                    <Menu.Item
                        as={Link} 
                        to='/doc' 
                        position='right' 
                        name='doc'
                        active={activeItem === 'doc'}
                        onClick={this.handleItemClick}>
                            <Icon name='help' />
                            Doc
                    </Menu.Item>
                    <Menu.Item
                        as={Link} 
                        to='/search' 
                        name='search'
                        active={activeItem === 'search'}
                        onClick={this.handleItemClick}>
                            <Icon name='search' />
                            Search
                    </Menu.Item>
                    <Menu.Item
                        as={Link} name='upload' to='/upload' 
                        name='upload'
                        active={activeItem === 'upload'}
                        onClick={this.handleItemClick}>
                            <Icon name='upload' />
                            Upload
                    </Menu.Item>
                    <Menu.Item
                        as={Link} name='schemes' to='/schemes' 
                        name='schemes'
                        active={activeItem === 'schemes'}
                        onClick={this.handleItemClick}>
                            <Icon name='file code outline' />
                            Schemes
                    </Menu.Item>
            </Menu>
        );
    }
}