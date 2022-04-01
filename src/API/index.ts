
const API_URL = "/api";

const Fetch = (url, params?) => {
  return fetch(`${API_URL}${url}`, params).then(r => r.json())
}

export default Fetch;