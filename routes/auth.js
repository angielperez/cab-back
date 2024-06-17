import Router from "express";
import AuthenticationService from '../services/AuthenticationService.js'

const router = Router()
router.post('/login', async function (req, res, next) {
  try {
    res.json(await AuthenticationService.login(req.body));
  } catch (err) {
    console.error(`Error while logining user`, err.message);
    next(err);
  }
});

export default router;