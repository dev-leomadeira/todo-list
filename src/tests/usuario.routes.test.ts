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

let count = 1;

describe("Teste de rotas de usuários", () => {

    test("Criando novo usuario", async () => {
        const token = await getToken();

        const createResponse = await supertest(app)
            .post("/api/usuarios")
            .set("Authorization", `Bearer ${token}`)
            .send({
                nome: "Admin new",
                email: `admin${count}@gmail.com`,
                senha: "root",
                papelId: 1
            });

        expect(createResponse.status).toBe(201);
        expect(createResponse.body).toHaveProperty("nome", "Admin new");
        expect(createResponse.body).toHaveProperty("email", `admin${count}@gmail.com`);
        expect(createResponse.body).toHaveProperty("senha", "root");
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
                nome: "Admin 2 - Beltrano",
                email: "beltrano_admin@gmail.com",
                senha: bcrypt.hashSync("root", 10),
                papelId: 2
            });
        
        expect(listResponse.status).toBe(200);
    })

    test("Deletar um usuario pelo id", async () => {
        const token = await getToken();

        const listResponse = await supertest(app)
            .delete("/api/usuarios/2")
            .set("Authorization", `Bearer ${token}`)
        
        expect(listResponse.status).toBe(204);
    })

});