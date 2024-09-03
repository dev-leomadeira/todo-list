import express from 'express';
import bodyParser from 'body-parser';
import sequelize from '../config/database';
import authRoutes from '../routes/authRoutes';
import Lista from "../models/lista.model";
import Tarefa from '../models/tarefa.model';
import Anuncio from '../models/anuncio.model';
import listaRoutes from '../routes/listaRoutes';
import tarefaRoutes from '../routes/tarefaRouter';
import usuarioRouter from '../routes/usuarioRouter';

Lista
Tarefa
Anuncio

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// Rotas
app.use('/auth', authRoutes);
app.use("/api", listaRoutes);
app.use("/api", tarefaRoutes);
app.use("/api", usuarioRouter);

// Middleware de tratamento de erros
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Algo deu errado!' });
});

// Conecta ao banco de dados e inicia o servidor
sequelize.sync()
    .then(() => {
        console.log('Banco de dados conectado com sucesso!');
        app.listen(port, () => {
        console.log(`Servidor iniciado em http://localhost:${port}`);
        });
}).catch(err => {
    console.error('Erro ao conectar ao banco de dados', err);
});