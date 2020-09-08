import { PRODUCTION_MODE } from './environment';

export let BASE_URL;

if (PRODUCTION_MODE) {
	BASE_URL = 'http://localhost:9000';
} else {
	BASE_URL = 'http://localhost:9000';
}

export const StatusCodes = {
	SUCCESS: 200,
	ERROR: 500,
	UNAUTHORIZED: 401,
	BAD_REQUEST: 400,
	NOT_FOUND: 404
};

export const APIs = {
	COMPANY_DETAILS: '/company-details',
	JOB_LISTINGS: '/job-listings'
};
