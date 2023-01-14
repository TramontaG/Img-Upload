import express, { Router } from 'express';
import fileUpload from 'express-fileupload';
import { validateError } from 'src/Errors';
import { saveImage } from 'src/services/img-upload';

const router = Router();

router.use(fileUpload());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/upload', async (req, res) => {
	try {
		const myImage = req.files?.image as fileUpload.UploadedFile | undefined;
		res.send(saveImage(myImage));
	} catch (err) {
		if (!validateError(err)) {
			return res.status(500).send();
		}
		res.status(err.status).send(err);
	}
});

export default router;
