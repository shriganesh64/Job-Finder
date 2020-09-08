import Axios from 'axios';
import { BASE_URL } from '../configs';

const API_URL = BASE_URL + '/api/jobs';

const getInstance = () => {
	return Axios.create({
		baseURL: API_URL,
		headers: {
			'content-type': 'application/json',
			accept: 'application/json'
		},
		transformResponse: Axios.defaults.transformResponse.concat(data => data)
	});
};

export default {
	getInstance
};
