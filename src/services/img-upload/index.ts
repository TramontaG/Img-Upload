import fileUpload from 'express-fileupload';

const allowedExtensions = ['jpeg', 'jpg', 'png'];

export const saveImage = (img?: fileUpload.UploadedFile) => {
	if (!validateImage(img)) return;

	const [imgName, imgExtension] = img!.name
		.split('.')
		.map(s => s.replace(/ /g, '_'));
	validateName([imgName, imgExtension]);

	img!.mv(`./static/img/${imgName}.${imgExtension}`);

	return {
		status: 200,
		message: 'File is uploaded',
		data: {
			name: imgName,
			mimetype: img.mimetype,
			size: img.size,
			endpoint: `/get/?img=${imgName}.${imgExtension}`,
		},
	};
};

const validateImage = (
	img?: fileUpload.UploadedFile
): img is fileUpload.UploadedFile => {
	if (!img) {
		throw {
			status: 402,
			message: 'No image uploaded',
		};
	}

	return true;
};

const validateName = ([imgName, imgExtension]: string[]) => {
	if (!imgName || !imgExtension) {
		throw {
			status: 402,
			message: 'Invalid image name',
		};
	}
	// if (!allowedExtensions.includes(imgExtension)) {
	// 	throw {
	// 		status: 402,
	// 		message: 'Invalid image extension',
	// 	};
	// }
};
