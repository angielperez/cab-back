import Router from "express";
import UsuarioService from '../services/UsuarioService.js'
import { ValidateTokenMiddleware } from '../services/middlewares/ValidateTokenMiddleware.js'
const router = Router()
router.post('/create', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await UsuarioService.create(req.body));
    } catch (err) {
      console.error(`Error while creating user`, err.message);
      next(err);
    }
  }
);

router.put('/update/:id', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await UsuarioService.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating user`, err.message);
      next(err);
    }
  }
);

router.get('/all', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await UsuarioService.all());
    } catch (err) {
      console.error(`Error while get all user`, err.message);
      next(err);
    }
  }
);

router.get('/find-by-id/:id', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await UsuarioService.find(req.params.id));
    } catch (err) {
      console.error(`Error while get by id user`, err.message);
      next(err);
    }
  }
);

export default router;