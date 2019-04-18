import React from 'react';
import _ from 'lodash'
import { Search } from 'semantic-ui-react'


const SEARCH_SUGGEST = 'api/search/suggest?prefix='

export default class SearchComponent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            results: [],
            value: ''
        }
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.handleResultSelected = this.handleResultSelected.bind(this)
    }

    componentWillMount() {
        this.resetComponent()
      }

    resetComponent() {
        this.setState({ isLoading: false, results: [], value: '' })
    }

    handleResultSelected(e, { result }){
        this.setState({ value: result.title })
        this.props.onResultSelected(result.title)
    }
    
    handleSearchChange(e, { value }){
        this.setState({ isLoading: true, value })

        if (!value){
            this.resetComponent()
            return
        }

        fetch(SEARCH_SUGGEST + value)
            .then(response => {
                return response.json()})
            // .then(json => {
            //     console.log('called api')
            //     console.log('suggestions: \n' + JSON.stringify(json, null, 2))
            //     return json})
            .then(json => this.setState({
                isLoading: false,
                results: json,
            }))
      }
    
      render() {
        let { isLoading, value, results } = this.state
        if (!value){
            value = this.props.defaultValue
        }
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