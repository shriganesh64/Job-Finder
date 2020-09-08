export const FormValues = {
	title: '',
	description: '',
	ctc: '',
	experience: '',
	companyId: '',
	jobTags: []
};

export const FormSchema = {
	title: {
		presence: { allowEmpty: false }
	},
	description: {
		presence: { allowEmpty: false }
	},
	experience: {
		presence: { allowEmpty: false }
	},
	companyId: {
		presence: { allowEmpty: false }
	},
	jobTags: {
		presence: { allowEmpty: false },
		type: 'array'
	}
};
