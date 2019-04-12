import React from 'react';
import _ from 'lodash'
import { Search } from 'semantic-ui-react'


const SEARCH_SUGGEST = 'api/search/suggest?prefix='

export default class SearchComponent extends React.Component {

    constructor(props) {
        super(props)
        const defaultValue = this.props.defaultValue != null ? this.props.defaultValue : ''
        console.log(props + '_____' + defaultValue)

        this.state = {
            isLoading: false,
            results: [],
            value: defaultValue
        }
        console.log(this.state)
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
        // console.log('handleResultSelected ' + result.title)
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
        const { isLoading, value, results } = this.state
        console.log(value)
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