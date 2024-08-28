import express from 'express';
import bodyParser from 'body-parser';
import sequelize from '../config/database';
import authRoutes from '../routes/authRoutes';
import protectedRoutes from '../routes/protectedRoutes';
import helloWorldRoutes from '../routes/helloWorldRoutes';
import Lista from "../models/lista.model";
import Tarefa from '../models/tarefa.model';
import Anuncio from '../models/anuncio.model';

Lista
Tarefa
Anuncio

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

//Rota inicial da aplicação [hello world]
app.use('/', helloWorldRoutes);

// Rotas de autenticação
app.use('/auth', authRoutes);

// Rotas protegidas
app.use('/protected', protectedRoutes);

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