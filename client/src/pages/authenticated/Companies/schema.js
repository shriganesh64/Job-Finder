export const FormValues = {
	companyName: '',
	companyLogo: '',
	location: ''
};

export const FormSchema = {
	companyName: {
		presence: { allowEmpty: false }
	},
	companyLogo: {
		presence: { allowEmpty: false },
		url: {
			allowDataUrl: true,
			allowLocal: true
		}
	},
	location: {
		presence: { allowEmpty: false }
	}
};
