import axios from 'axios';
//console.log(import.meta.env.VITE_URL_API)
const baseURL = `http://localhost:8080/api/`
//const baseURL = `/api`
//const baseURL = import.meta.env.VITE_URL_API

export default axios.create({
	baseURL,
	headers: {
		ContentType: 'application/json',
	},
});