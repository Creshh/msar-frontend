
const SEARCH_SUGGEST = 'api/search/suggest?prefix='
const SEARCH_QUERY = 'api/search/query?query='
const ASSETS_UPLOAD = 'api/assets/upload'
const ASSETS_GET = 'api/assets/get/'
const DOCUMENTS_GET = 'api/doc/get?'
const DOCUMENTS_ADD = 'api/doc/add?'
const TYPES_GET = 'api/type/get'

export default class QueryHandler {

    static getAsset(reference, thumb, download=false){
        return ASSETS_GET + reference + (thumb ? '?thumb=true' : '?thumb=false') + (download ? '&dl=true' : '&dl=false')
    }

    static downloadAsset(reference){
        let a = document.createElement('a')
        a.href = ASSETS_GET + reference + '?dl=true'
        a.setAttribute('download', '')
        a.click()
        a.remove()
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

    static getTypes(){
        return fetch(TYPES_GET)
            .then(response => {
                console.log(response)
                return response.json()
            })
    }


    static uploadFile(file){
        if(!file) {
            return {success: false, msg: 'Please upload a file.'}

          }
          if(file.size >= 50000000) {
            return {success: false, msg: 'File size exceeds limit of 50MB.'}
          }
          let data = new FormData();
          data.append('file', file);
          data.append('name', file.name);
          fetch(ASSETS_UPLOAD, {
            method: 'POST',
            body: data
          }).then(response => {
            return {success: true, msg: 'success'}
          }).catch(err => {
            return {success: false, msg: err}
          });
    }

    static addDocument(file, reference){
        let data = new FormData();
        data.append('file', file);
        data.append('name', file.name);
        let success;
        return fetch(DOCUMENTS_ADD + 'reference=' + reference, {
            method: 'POST',
            body: data
        })
        .then(response => {
            success = response.ok;
            return response.text()
        })
        .then(msg => {
            return {success: success, msg: msg}
        })
        .catch(err => {
            console.log(err)
            return {success: false, msg: err}
        });
    }

}