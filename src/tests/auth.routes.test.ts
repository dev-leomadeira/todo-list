import supertest from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import authRouter from '../routes/authRoutes';

const app = express();
app.use(bodyParser.json());
app.use('/auth', authRouter);

let count = 1;

describe("Teste de rotas de autenticação", () => {

    test("Criando novo usuario", async () => {
        const response = await supertest(app)
            .post("/auth/registrar")
            .send({
                nome: "Fulano",
                email: `fulano${count}@gmail.com`,
                senha: "root",
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("nome", "Fulano");
        expect(response.body).toHaveProperty("email", `fulano${count}@gmail.com`);
        expect(response.body).toHaveProperty("papelId", 2);
    });

    test("Login de usuário existente", async () => {
       const response = await supertest(app)
            .post("/auth/logar")
            .send({
                email: "admin@gmail.com",
                senha: "root",
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
        expect(response.body).toHaveProperty("user");
        expect(response.body.user).toHaveProperty("email", "admin@gmail.com");

        const token = response.body.token;
        console.log(token);
    });
});