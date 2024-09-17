import supertest from "supertest";
import express from "express";
import bodyParser from "body-parser";
import authRouter from "../routes/authRoutes";
import tarefaRouter from "../routes/tarefaRouter";
import { getToken } from "./authSetup";

const app = express();

app.use(bodyParser.json());
app.use("/auth", authRouter);
app.use('/api', tarefaRouter);

describe("Teste de rotas de tarefas", () => {
    
    test("Criar uma nova tarefa", async () => {
        const token = await getToken();

        const createResponse = await supertest(app)
            .post('/api/tarefas')
            .set('Authorization', `Bearer ${token}`)
            .send({
                descricao: "Tarefa de teste - jest",
                listaId: 1
            });
        
        expect(createResponse.status).toBe(201);
 
    });

    test("Listar todas as tarefas", async () => {
        const token = await getToken();

        const listResponse = await supertest(app)
            .get('/api/tarefas/lista/1')
            .set('Authorization', `Bearer ${token}`);

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.length).toBeGreaterThan(0);
    });

    test("Atualizar uma tarefa existente", async () => {
        const token = await getToken();

        const updateResponse = await supertest(app)
            .put('/api/tarefas/1')
            .set('Authorization', `Bearer ${token}`)
            .send({
                concluida: true
            });

        expect(updateResponse.status).toBe(204);
    });

    test("Deletar uma tarefa", async () => {
        const token = await getToken();

        const createResponse = await supertest(app)
            .post('/api/tarefas')
            .set('Authorization', `Bearer ${token}`)
            .send({
                descricao: "Tarefa para deletar",
                listaId: 1
            });

        const tarefaId = createResponse.body.id;

        const deleteResponse = await supertest(app)
            .delete(`/api/tarefas/${tarefaId}/lista/1`)
            .set('Authorization', `Bearer ${token}`);

        expect(deleteResponse.status).toBe(204);
    });
})
