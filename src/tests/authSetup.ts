import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import authRouter from '../routes/authRoutes';

const app = express();
app.use(bodyParser.json());
app.use('/auth', authRouter);

let token: string; 

const getToken = async () => {
  if (!token) {
    const loginResponse = await request(app)
      .post('/auth/logar')
      .send({ 
        email: 'admin@gmail.com', 
        senha: 'root' 
      });

    if (loginResponse.status === 200) {
      token = loginResponse.body.token;
    } else {
      throw new Error('Erro ao realizar login');
    }
  }

  return token;
};

if (!!getToken()) {
  console.log(`Usuario logado: ${getToken()}`);
}

export { getToken };