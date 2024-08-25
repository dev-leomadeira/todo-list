import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors'; // Para capturar erros assíncronos
import sequelize from '../config/database';
import helloWorldRoutes from '../routes/helloWorldRoutes';

const app = express();
const port = process.env.PORT;

// Middleware de segurança
app.use(helmet());

// Configura o CORS
app.use(cors());

// Logger HTTP
app.use(morgan('dev'));

// Configuração do Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Rota inicial da aplicação [hello world]
app.use('/', helloWorldRoutes);

// Middleware de tratamento de erros
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Algo deu errado!' });
});

sequelize.sync().then(() => {
    console.log('Banco de dados conectado com sucesso!');
    app.listen(port, () => {
      console.log(`Servidor iniciado em http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Erro ao conectar ao banco de dados', err);
});