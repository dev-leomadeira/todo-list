import express from "express";
import bodyParser from "body-parser";
import authRouter from "../routes/authRoutes";
import listaRouter from "../routes/listaRoutes";
import { getToken } from "./authSetup";
import supertest from "supertest";

const app = express();
app.use(bodyParser.json());
app.use("/auth", authRouter);
app.use("/api", listaRouter);

describe("Testar rotas e CRUD de listas", () => {
  test("Criar uma nova lista com sucesso", async () => {
    const token = await getToken();
    const timestamp = new Date().getTime();
    const list = `Lista de Teste ${timestamp}`;

    // Criar nova lista
    const createResponse = await supertest(app)
      .post("/api/listas")
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: list });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body).toHaveProperty("id");
    expect(createResponse.body.nome).toBe(list);
  });

  test("Listar todas as listas de um usuário", async () => {
    const token = await getToken();

    // Listar todas as listas
    const listResponse = await supertest(app)
      .get("/api/listas")
      .set("Authorization", `Bearer ${token}`);

    expect(listResponse.status).toBe(200);
  });

  test("Atualizar uma lista existente", async () => {
    const token = await getToken();

    const updateResponse = await supertest(app)
      .put("/api/listas/1")
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "Lista Atualizada" });

    expect(updateResponse.status).toBe(200);
  });

  test("Deletar uma lista", async () => {
    const token = await getToken();

    const createResponse = await supertest(app) // Cria uma lista para garantir que a lista existe antes de tentar deletar
      .post("/api/listas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Lista para deletar",
      });

    const listaId = createResponse.body.id; // Obtém o ID da lista criada

    const deleteResponse = await supertest(app)
      .delete(`/api/listas/${listaId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(deleteResponse.status).toBe(204);
  });
});
