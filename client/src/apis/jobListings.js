import Axios from './axios';
import { APIs } from '../configs';

export const GetJobListings = () => {
	return Axios.getInstance()
		.get(APIs.JOB_LISTINGS)
		.then(response => response.data)
		.catch(err => err);
};

export const CreateJob = payload => {
	return Axios.getInstance()
		.post(APIs.JOB_LISTINGS, payload)
		.then(response => response.data)
		.catch(err => err);
};

export const UpdateJob = (payload, id) => {
	return Axios.getInstance()
		.put(`${APIs.JOB_LISTINGS}/${id}`, payload)
		.then(response => response.data)
		.catch(err => err);
};

export const DeleteJob = id => {
	return Axios.getInstance()
		.delete(`${APIs.JOB_LISTINGS}/${id}`)
		.then(response => response.data)
		.catch(err => err);
};
