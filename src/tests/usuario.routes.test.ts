import supertest from "supertest";
import express from 'express';
import bodyParser from 'body-parser';
import authRouter from '../routes/authRoutes';
import usuarioRouter from '../routes/usuarioRouter';
import bcrypt from 'bcryptjs';
import { getToken } from "./authSetup";

const app = express();

app.use(bodyParser.json());
app.use('/auth', authRouter);
app.use('/api', usuarioRouter);

describe("Teste de rotas de usuários", () => {

    test("Criando novo usuario", async () => {
        const token = await getToken();
        const timestamp = new Date().getTime();
        const email = `jest${timestamp}@gmail.com`;

        const createResponse = await supertest(app)
            .post("/api/usuarios")
            .set("Authorization", `Bearer ${token}`)
            .send({
                nome: "Admin new",
                email: email,
                senha: "root",
                papelId: 1
            });

        expect(createResponse.status).toBe(201);
        expect(createResponse.body).toHaveProperty("nome", "Admin new");
        expect(createResponse.body).toHaveProperty("email", email);
    });

    test("Listar todos os usuários", async () => {
        const token = await getToken();

        const listResponse = await supertest(app)
            .get("/api/usuarios")
            .set("Authorization", `Bearer ${token}`);
        
        expect(listResponse.status).toBe(200);
    })

    test("Listar usuario por id", async () => {
        const token = await getToken();

        const listResponse = await supertest(app)
            .get("/api/usuarios/1")
            .set("Authorization", `Bearer ${token}`);
        
        expect(listResponse.status).toBe(200);

    })

    test("Atualizar um usuario pelo id", async () => {
        const token = await getToken();

        const listResponse = await supertest(app)
            .put("/api/usuarios/2")
            .set("Authorization", `Bearer ${token}`)
            .send({ 
                nome: "Beltrano - Jest",
                email: "beltrano_jest@gmail.com",
                senha: bcrypt.hashSync("root", 10),
                papelId: 2
            });
        
        expect(listResponse.status).toBe(200);
    })

    test("Deletar um usuario pelo id", async () => {
        const token = await getToken();

        const createResponse = await supertest(app)
            .post("/api/usuarios")
            .set("Authorization", `Bearer ${token}`)
            .send({
                nome: "Usuario para deletar",
                email: `usuario${new Date().getTime()}@gmail.com`,
                senha: "root",
                papelId: 1
            });

        const usuarioId = createResponse.body.id;

        const deleteResponse = await supertest(app)
            .delete(`/api/usuarios/${usuarioId}`)
            .set("Authorization", `Bearer ${token}`);
        
        expect(deleteResponse.status).toBe(204);
    })

});