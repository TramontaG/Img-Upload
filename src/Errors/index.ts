import { DefaultError } from 'src/models';

export const validateError = (err: DefaultError | unknown): err is DefaultError => {
	const maybeError = err as DefaultError;

	if (maybeError.status && maybeError.message) {
		return true;
	}

	return false;
};
