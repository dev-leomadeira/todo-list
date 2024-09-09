import Lista from '../models/lista.model';
import Tarefa from '../models/tarefa.model';

// Função para criar uma tarefa
async function createTarefa() {
    try {
        // Encontre uma lista existente
        const lista = await Lista.findOne({ where: { id: 1 } }); // Altere o ID conforme necessário

        if (!lista) {
            console.log('Lista não encontrada');
            return;
        }

        // Crie uma nova tarefa
        const tarefa = await Tarefa.create({
            descricao: 'Minha nova tarefa',
            concluida: false,
            listaId: lista.id,
            dataCriacao: new Date(), // Adicione a data de criação
        });

        console.log('Tarefa criada com sucesso:', tarefa.toJSON());
    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
    }
}

// Execute a função
createTarefa();
