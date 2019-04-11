import React from 'react'
import {Menu} from 'semantic-ui-react'
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
                        to='/search' 
                        position='right' 
                        name='search'
                        active={activeItem === 'search'}
                        onClick={this.handleItemClick}>
                            Search
                    </Menu.Item>
                    <Menu.Item
                        as={Link} name='upload' to='/upload' 
                        name='upload'
                        active={activeItem === 'upload'}
                        onClick={this.handleItemClick}>
                            Upload
                    </Menu.Item>
            </Menu>
        );
    }
}