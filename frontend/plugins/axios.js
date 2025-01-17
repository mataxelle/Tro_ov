import axios from 'axios';

export default defineNuxtPlugin(() => {
  const instance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true, // Actives cookies
  });

  return {
    provide: {
      axios: instance,
    },
  };
});
