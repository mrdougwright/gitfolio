const API = process.env.REACT_APP_RAILS_API

var api = {
  getUserSnapshots(username) {
    let url = `${API}/${username}`
    return fetch(url).then((res) => res.json())
  },

  getRepoImage(username, reponame) {
    let url = `${API}/${username}/${reponame}`
    return fetch(url).then((res) => res.json())
  },

  updateRepos(username) {
    let url = `${API}/${username}`
    return fetch(url, {method: 'POST', body: {}}).then((res) => res.json())
  }
}

export default api;
