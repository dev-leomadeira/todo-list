import sequelize from '../config/database';

const syncDatabase = async () => {
    try {
        // Sincroniza todos os modelos com o banco de dados
        await sequelize.sync({ force: true }); // Use `force: true` para recriar as tabelas
        console.log('Tabelas e relacionamentos sincronizados com sucesso!');
    } catch (error) {
        console.error('Erro ao sincronizar tabelas:', error);
    }
};

syncDatabase();
