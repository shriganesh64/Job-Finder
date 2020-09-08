import Axios from './axios';
import { APIs } from '../configs';

export const GetCompanies = () => {
	return Axios.getInstance()
		.get(`${APIs.COMPANY_DETAILS}`)
		.then(response => response.data)
		.catch(err => err);
};

export const CreateCompany = payload => {
	return Axios.getInstance()
		.post(APIs.COMPANY_DETAILS, payload)
		.then(response => response.data)
		.catch(err => err);
};

export const UpdateCompany = (payload, id) => {
	return Axios.getInstance()
		.put(`${APIs.COMPANY_DETAILS}/${id}`, payload)
		.then(response => response.data)
		.catch(err => err);
};

export const DeleteCompany = id => {
	return Axios.getInstance()
		.delete(`${APIs.COMPANY_DETAILS}/${id}`)
		.then(response => response.data)
		.catch(err => err);
};
