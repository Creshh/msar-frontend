import React from 'react';
import _ from 'lodash'
import { Search } from 'semantic-ui-react'

export default class SearchComponent extends React.Component {
    componentWillMount() {
        this.resetComponent()
      }

    resetComponent() {
        this.setState({ isLoading: false, results: [], value: '' })
    }

    handleResultSelect(e, { result }){
        this.setState({ value: result.title })
    }
    
    handleSearchChange(e, { value }){
        this.setState({ isLoading: true, value })

        if (!value){
            this.resetComponent()
            return
        }

        fetch('/api/suggest?prefix=' + value)
            .then(response => {
                return response.json()})
            .then(json => {
                console.log('called api')
                console.log('suggestions: \n' + JSON.stringify(json, null, 2))
                return json})
            .then(json => this.setState({
                isLoading: false,
                results: json,
            }))
      }
    
      render() {
        const { isLoading, value, results } = this.state
    
        return (
              <Search
                category
                loading={isLoading}
                onResultSelect={this.handleResultSelect.bind(this)}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true }).bind(this)}
                results={results}
                value={value}
                {...this.props}
              />
        )
      }
    }