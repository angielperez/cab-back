import Router from "express";
import ExcusaService from '../services/ExcusaService.js'
import { ValidateTokenMiddleware } from '../services/middlewares/ValidateTokenMiddleware.js'
const router = Router()
router.post('/create', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await ExcusaService.create(req.body));
    } catch (err) {
      console.error(`Error while creating excusa`, err.message);
      next(err);
    }
  }
);

router.put('/update/:id', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await ExcusaService.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating excusa`, err.message);
      next(err);
    }
  }
);

router.get('/all', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await ExcusaService.all());
    } catch (err) {
      console.error(`Error while get all excusa`, err.message);
      next(err);
    }
  }
);

router.get('/find-by-id/:id', [ValidateTokenMiddleware],
    async function (req, res, next) {
      try {
        res.json(await ExcusaService.find(req.params.id));
      } catch (err) {
        console.error(`Error while get by id excusa`, err.message);
        next(err);
      }
    }
);

export default router;