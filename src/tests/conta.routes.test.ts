import supertest from "supertest";
import express from 'express';
import bodyParser from 'body-parser';
import authRouter from '../routes/authRoutes';
import contaRouter from '../routes/contaRouter';
import { getToken } from "./authSetup";

const app = express();

app.use(bodyParser.json());
app.use('/auth', authRouter);
app.use('/api', contaRouter);

describe("Teste de rotas de contas", () => {
    test('visualizar os dados da conta do usuário', async () => {
        const token = await getToken();
    
        const response = await supertest(app)
          .get('/api/usuario/conta')
          .set('Authorization', `Bearer ${token}`);
    
        expect(response.status).toBe(200); 
        expect(response.body).toHaveProperty('id');
    });
    
    test('Deve atualizar a conta do usuário com sucesso', async () => {
        const token = await getToken();
    
        const updateResponse = await supertest(app)
            .put('/api/usuario/conta')
            .set('Authorization', `Bearer ${token}`)
            .send({ 
                email: "admin@gmail.com",
                nome: "Admin - Nome Atualizando",
                senha: "root"
            });
    
        expect(updateResponse.status).toBe(200); 
        expect(updateResponse.body).toHaveProperty('id');
    });
    
    test('Deve deletar a conta do usuário com sucesso', async () => {
        const token = await getToken();
    
        const deleteResponse = await supertest(app)
          .delete('/api/usuario/conta')
          .set('Authorization', `Bearer ${token}`);
    
        expect(deleteResponse.status).toBe(403);
      });
})