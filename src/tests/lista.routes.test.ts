import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import authRouter from '../routes/authRoutes'; 
import listaRouter from '../routes/listaRoutes';
import { getToken } from './authSetup';

const app = express();
app.use(bodyParser.json());
app.use('/auth', authRouter);
app.use('/api', listaRouter);

describe('Testar rotas e CRUD de listas', () => {
  test('Criar uma nova lista com sucesso', async () => {
    const token = await getToken();

    // Criar nova lista
    const createResponse = await request(app)
      .post('/api/listas')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Lista de Teste' });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body).toHaveProperty('id');
    expect(createResponse.body.nome).toBe('Lista de Teste');
  });

  test('Listar todas as listas de um usuário', async () => {
    const token = await getToken();

    // Listar todas as listas
    const listResponse = await request(app)
      .get('/api/listas/usuario')
      .set('Authorization', `Bearer ${token}`);

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.length).toBeGreaterThan(1);
  });

  test('Atualizar uma lista existente', async ()=> {
    const token = await getToken();

    // Atualizar uma lista existente
    const updateResponse = await request(app)
      .put('/api/listas/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Lista Atualizada' });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toHaveProperty('message', 'Lista Atualizada');
  });

  test('Deletar uma lista', async () => {
    const token = await getToken();

    const response = await request(app)
      .delete('/api/listas/1') // Assumindo que a lista com ID 1 já existe
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});
