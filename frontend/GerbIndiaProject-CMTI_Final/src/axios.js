// axios.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.0.105:6969', // Replace with your server's base URL
  // You can add other Axios configurations here if needed
});

export default instance;
