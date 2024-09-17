import supertest from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import authRouter from '../routes/authRoutes';

const app = express();
app.use(bodyParser.json());
app.use('/auth', authRouter);

describe("Teste de rotas de autenticação", () => {

    test("Criando novo usuario", async () => {

        const timestamp = new Date().getTime();
        const email = `fulano${timestamp}@gmail.com`;
    
        const register = await supertest(app)
            .post("/auth/registrar")
            .send({
                nome: "Fulano",
                email: email,
                senha: "root",
            });
    
        expect(register.status).toBe(201);
        expect(register.body).toHaveProperty("nome", "Fulano");
        expect(register.body).toHaveProperty("email", email);
        expect(register.body).toHaveProperty("papelId", 2);
    });

    test("Login de usuário existente", async () => {
       const login = await supertest(app)
            .post("/auth/logar")
            .send({
                email: "admin@gmail.com",
                senha: "root",
            });

        expect(login.status).toBe(200);
        expect(login.body).toHaveProperty("token");
        expect(login.body).toHaveProperty("user");
        expect(login.body.user).toHaveProperty("email", "admin@gmail.com");

        // const token = login.body.token;
        // console.log(token);
    });
});