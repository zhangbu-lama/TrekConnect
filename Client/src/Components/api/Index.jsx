import axios from "axios";

const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: 'http://127.0.0.1:8000/api',
});

// Optional: Set Content-Type conditionally
=======
  baseURL: 'http://localhost:8000/api',
});


>>>>>>> 35db7a5d9a51e002f121b2a02717464c47f87411
axiosInstance.interceptors.request.use(config => {
  return config;
});


export default axiosInstance;



