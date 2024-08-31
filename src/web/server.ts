import express from 'express';
import bodyParser from 'body-parser';
import sequelize from '../config/database';
import authRoutes from '../routes/authRoutes';
import Lista from "../models/lista.model";
import Tarefa from '../models/tarefa.model';
import Anuncio from '../models/anuncio.model';
import listaRoutes from '../routes/listaRoutes';
import tarefaRoutes from '../routes/tarefaRouter';

Lista
Tarefa
Anuncio

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// Rotas de autenticação
app.use('/auth', authRoutes);

// Adiciona as rotas de listas ao app
app.use("/api", listaRoutes);

// Adiciona as rotas de listas ao app
app.use("/api", tarefaRoutes);

// Middleware de tratamento de erros
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Algo deu errado!' });
});

sequelize.sync()
    .then(() => {
        console.log('Banco de dados conectado com sucesso!');
        app.listen(port, () => {
        console.log(`Servidor iniciado em http://localhost:${port}`);
        });
}).catch(err => {
    console.error('Erro ao conectar ao banco de dados', err);
});