import axios from "axios";

class UserService {
  url = process.env.REACT_APP_SERVER_URL;

  async auth(email, password) {
    const response = await axios.post(`${this.url}/auth`, { email, password })
    const token = response.data.token;
    localStorage.setItem('jwt_token', token);
    return response
  }

  async list() {
    const token = localStorage.getItem('jwt_token');
    axios.defaults.headers.common['Authorization'] = token;
    const response = await axios.get(`${this.url}/users`);
    return response;
  }

  async get(id) {
    const token = localStorage.getItem('jwt_token');
    axios.defaults.headers.common['Authorization'] = token;
    const response = await axios.get(`${this.url}/users/${id}`);
    return response;
  }

  async create(data) {
    const token = localStorage.getItem('jwt_token');
    axios.defaults.headers.common['Authorization'] = token;
    const response = await axios.post(`${this.url}/users`, data);
    return response;
  }

  async delete(id) {
    const token = localStorage.getItem('jwt_token');
    axios.defaults.headers.common['Authorization'] = token;
    const response = await axios.delete(`${this.url}/users/${id}`);
    return response;
  }

  async update(id, data) {
    const token = localStorage.getItem('jwt_token');
    axios.defaults.headers.common['Authorization'] = token;
    const response = await axios.put(`${this.url}/users/${id}`, data);
    return response;
  }
}

export default new UserService;
