import Router from "express";
import PersonaService from '../services/PersonaService.js'
import { ValidateTokenMiddleware } from '../services/middlewares/ValidateTokenMiddleware.js'
const router = Router()
router.post('/create', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await PersonaService.create(req.body));
    } catch (err) {
      console.error(`Error while creating people`, err.message);
      next(err);
    }
  }
);

router.put('/update/:id', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await PersonaService.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating people`, err.message);
      next(err);
    }
  }
);

router.get('/all', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await PersonaService.all());
    } catch (err) {
      console.error(`Error while get all people`, err.message);
      next(err);
    }
  }
);

router.get('/find-by-id/:id', [ValidateTokenMiddleware],
    async function (req, res, next) {
      try {
        res.json(await PersonaService.find(req.params.id));
      } catch (err) {
        console.error(`Error while get by id people`, err.message);
        next(err);
      }
    }
);

export default router;