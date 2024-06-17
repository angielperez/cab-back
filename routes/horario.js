import Router from "express";
import HorarioService from '../services/HorarioService.js'
import { ValidateTokenMiddleware } from '../services/middlewares/ValidateTokenMiddleware.js'
const router = Router()
router.post('/save', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await HorarioService.createOrUpdate(req.body));
    } catch (err) {
      console.error(`Error while creating people`, err.message);
      next(err);
    }
  }
);

router.get('/find-by-people/:id', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await HorarioService.findByPeople(req.params.id));
    } catch (err) {
      console.error(`Error while get all people`, err.message);
      next(err);
    }
  }
);

export default router;