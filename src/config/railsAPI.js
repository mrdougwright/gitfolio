// const API = 'https://githubcv.herokuapp.com/api/v1'
const API = 'http://localhost:3000/api/v1'

var api = {
  getUserSnapshots(username) {
    let url = `${API}/${username}`;
    return fetch(url).then((res) => res.json())
  },

  getRepoImage(username, reponame) {
    let url = `${API}/${username}/${reponame}`;
    return fetch(url).then((res) => res.json())
  }
};

export default api;
