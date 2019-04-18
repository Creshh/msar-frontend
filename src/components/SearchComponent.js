import React from 'react';
import _ from 'lodash'
import { Search } from 'semantic-ui-react'

import QueryHandler from '../common/QueryHandler'

export default class SearchComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            results: [],
            value: this.props.defaultValue
        }
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.handleResultSelected = this.handleResultSelected.bind(this)
    }

    handleResultSelected(e, { result }){
        this.setState({ value: result.title })
        this.props.onResultSelected(result.title)
    }
    
    handleSearchChange(e, { value }){
        this.setState({ isLoading: true, value })

        if (!value){
            this.setState({
                isLoading: false,
                results: [],
                value: ''
            })
            return
        }

        QueryHandler.getSuggestion(value).then(json => {
            this.setState({
                isLoading: false,
                results: json,
            })
        })
      }
    
      render() {
        let { isLoading, value, results } = this.state
        return (
              <Search
                {...this.props.search}
                loading={isLoading}
                onResultSelect={this.handleResultSelected}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                results={results}
                value={value}
              />
        )
    }
}