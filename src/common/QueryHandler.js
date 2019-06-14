
const SEARCH_SUGGEST = 'api/search/suggest?prefix='
const SEARCH_QUERY = 'api/search/query?query='
const SEARCH_MULTIPLE = 'api/search/multiple'
const ASSETS_UPLOAD = 'api/assets/upload'
const ASSETS_GET = 'api/assets/get/'
const ASSETS_REMOVE = 'api/assets/remove/'
const DOCUMENTS_GET = 'api/doc/get?'
const DOCUMENTS_ADD = 'api/doc/add?'
const TYPES_GET = 'api/type/get'
const TYPES_ADD = 'api/type/add'
const FIELDS_GET = 'api/type/getFields'


export default class QueryHandler {

    static getAsset(reference, thumb, download=false){
        return ASSETS_GET + reference + (thumb ? '?thumb=true' : '?thumb=false') + (download ? '&dl=true' : '&dl=false')
    }

    static removeAsset(reference){
        return fetch(ASSETS_REMOVE + reference)
        .then(response => {
            return response.json()
        })
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

    static multiple(value){
        return fetch(SEARCH_MULTIPLE, {
            method: 'POST',
            body: value
          }).then(response => {
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
                return response.json()
            })
    }

    static getFields(){
        return fetch(FIELDS_GET)
            .then(response => {
                return response.json()
            })
    }


    static uploadFile(file){
        // if(!file) {
        //     return {success: false, msg: 'Please upload a file.'}

        //   }
        //   if(file.size >= 50000000) {
        //     return {success: false, msg: 'File size exceeds limit of 50MB.'}
        //   }
          let data = new FormData();
          data.append('file', file);
          data.append('name', file.name);
          return fetch(ASSETS_UPLOAD, {
            method: 'POST',
            body: data
          }).then(response => {
              return response.json()
          }).then(json => {
            return {success: true, reference: json.id}
          }).catch(err => {
            return {success: false, msg: err, reference: -1}
          });
    }

    static addDocument(file, reference){
        let data = new FormData();
        data.append('file', file);
        data.append('name', file.name);
        return fetch(DOCUMENTS_ADD + 'reference=' + reference, {
            method: 'POST',
            body: data
        })
        .then(response => {
            if(response.ok){
                return {success: response.ok, msg: response.statusText}
            } else {
                return response.text().then(msg => {
                    return {success: false, msg: msg}
                })
            }
        })
        .catch(err => {
            return {success: false, msg: err}
        });
    }

    static addType(file){
        let data = new FormData();
        data.append('file', file);
        data.append('name', file.name);
        return fetch(TYPES_ADD, {
            method: 'POST',
            body: data
        })
        .then(response => {
            if(response.ok){
                return {success: response.ok, msg: response.statusText}
            } else {
                return response.text().then(msg => {
                    return {success: false, msg: msg}
                })
            }
        })
        .catch(err => {
            return {success: false, msg: err}
        });
    }

}