import Anuncio from '../models/anuncio.model';
import Usuario from '../models/usuario.model';
import Papel from '../models/papel.model';

// Função para criar um anúncio
async function createAnuncio(usuarioId: number, anuncioData: {
    imagemUrl: string;
    scriptAdsense: string;
    ativo: boolean;
}) {
    try {
        // Encontre o usuário que está criando o anúncio
        const usuario = await Usuario.findOne({
            where: { id: usuarioId },
            include: {
                model: Papel,
                as: "papel",
                attributes: ["id", "nome"] // Inclua o ID e nome do papel
            }
        });

        if (!usuario) {
            console.log('Usuário não encontrado');
            return;
        }

        // Verifique se o usuário tem o papel de admin
        console.log('Papel do Usuário:', usuario.nome, usuario.papelId); // Adicione este log para depuração

        if (usuario.papelId !== 1) {
            console.log('Apenas usuários com o papel de admin podem criar anúncios');
            return;
        }

        // Crie o anúncio
        const anuncio = await Anuncio.create({
            ...anuncioData,
            usuarioId: usuario.id
        });

        console.log('Anúncio criado com sucesso:', anuncio.toJSON());
    } catch (error) {
        console.error('Erro ao criar anúncio:', error);
    }
}

// Exemplo de uso
createAnuncio(1, {
    imagemUrl: 'http://teste.com/imagem.jpg',
    scriptAdsense: '',
    ativo: true
});