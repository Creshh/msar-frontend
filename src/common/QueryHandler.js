
const SEARCH_SUGGEST = 'api/search/suggest?prefix='
const SEARCH_QUERY = 'api/search/query?query='
const ASSETS_UPLOAD = 'api/assets/upload'
const ASSETS_GET = 'api/assets/get/'
const DOCUMENTS_GET = 'api/doc/get?'

export default class QueryHandler {

    static getAsset(reference, thumb){
        return ASSETS_GET + reference + (thumb ? '?thumb=true' : '')
    }

    static getSuggestion(value){
        return fetch(SEARCH_SUGGEST + value)
            .then(response => {
                return response.json()
            })
    }

    static query(value){
        return fetch(SEARCH_QUERY + value)
            .then(response => {
                return response.json()
            })
    }

    static getDocuments(reference){
        return fetch(DOCUMENTS_GET + 'reference=' + reference)
            .then(response => {
                return response.json()
            })
    }

}