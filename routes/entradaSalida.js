import Router from "express";
import EntradaSalidaService from '../services/EntradaSalidaService.js'
import { ValidateTokenMiddleware } from '../services/middlewares/ValidateTokenMiddleware.js'
const router = Router()
router.post('/validate', async function (req, res, next) {
    try {
      res.json(await EntradaSalidaService.validateAccess(req.body));
    } catch (err) {
      console.error(`Error while validate input or output`, err.message);
      next(err);
    }
  }
);

router.post('/find-by-date', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await EntradaSalidaService.findByDates(req.body));
    } catch (err) {
      console.error(`Error while find-by-date`, err.message);
      next(err);
    }
  }
);

export default router;