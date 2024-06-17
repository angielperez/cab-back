import express, { json, urlencoded } from "express";
import authRouter from './routes/auth.js'
import usuariosRouter from './routes/usuarios.js'
import personasRouter from './routes/personas.js'
import horarioRouter from './routes/horario.js'
import excusasRouter from './routes/excusas.js'
import entradaSalidaRouter from './routes/entradaSalida.js'
import cors from 'cors'
const app = express();
const port = 3000;
app.use(json());
app.use(cors());
app.use(
  urlencoded({
    extended: true,
  })
);



app.use("/auth", authRouter);
app.use("/usuario", usuariosRouter);
app.use("/persona", personasRouter);
app.use("/horario", horarioRouter);
app.use("/excusa", excusasRouter);
app.use("/entrada-salida", entradaSalidaRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Servidor corriendo por http://localhost:${port}`);
});