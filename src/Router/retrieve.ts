import cors from 'cors';
import { Router } from 'express';

const router = Router();

router.use(cors());

router.get('/get', async (req, res) => {
	try {
		const imgName = req.query.img;
		res.sendFile(`./static/img/${imgName}`, { root: './' });
	} catch (e) {
		res.status(500).send({
			status: 500,
			message: 'No such file or directory',
		});
	}
});

export default router;
