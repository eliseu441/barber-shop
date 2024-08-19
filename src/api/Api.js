import axios from 'axios';
const baseURL = `/api`

export default axios.create({
	baseURL,
	headers: {
		ContentType: 'application/json',
	},
});