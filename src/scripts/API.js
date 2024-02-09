class API {
    constructor(options) {
        this._user = options.user
        this._headers = options.headers
    }
    _errorCheck(res) {

        if (res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(res.status)
        }
    }
    getAllRepos() {
        return fetch(`https://api.github.com/users/${this._user}/repos`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._errorCheck)

    }
    getRepoContent(repo){
        return fetch(`https://api.github.com/repos/${this._user}/${repo}/contents`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._errorCheck)  
    }
    getRepoReadMe(repo) {
        return fetch(`https://api.github.com/repos/${this._user}/${repo}/contents/README.md`, {
            method: 'GET',
            headers: this._headers
        }).then(this._errorCheck)
    }
  



}

export const api = new API({
    user: 'zatzoid',

    headers: {
        'Content-Type': 'application/json',
        "Authorization": "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"
       
    }

})
 /* 'accept': 'application/vnd.github.VERSION.raw' */

