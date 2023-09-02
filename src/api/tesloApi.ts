import axios from 'axios';

// Creamos una instancia de axios con un URL base ya definido
const tesloApi = axios.create({
  withCredentials: true, // Habilitamos que axios pueda enviar las cookies de manera automaticamente en cada request
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export default tesloApi;
