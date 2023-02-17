import express, { Router } from 'express';
import fileUpload from 'express-fileupload';
import { validateError } from 'src/Errors';
import { saveImage } from 'src/services/img-upload';
import useAuth from 'src/Auth';
import cors from 'cors';

const router = Router();

const allowedDomains = ['http://gramont.ddns.net', 'http://gramont.ddns.net:5173'];

router.use(
	'/',
	cors({
		credentials: true,
		origin: (origin, callback) => {
			if (!origin) {
				console.log(origin);
				return callback(null, true);
			}
			if (allowedDomains.includes(origin)) {
				return callback(null, true);
			} else {
				return callback(new Error('Origin not allowed'), false);
			}
		},
	})
);

router.use(fileUpload());
router.use(express.urlencoded({ extended: true }));
// router.use(useAuth(['image']));

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
