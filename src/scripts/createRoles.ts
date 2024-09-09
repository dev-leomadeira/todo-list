import Role from '../models/papel.model';

async function createAdminRole() {
    try {
        const created = await Role.findOrCreate({
            where: { nome: 'ADMIN' },
            defaults: { nome: 'ADMIN' },
        });
        if (created) {
            console.log('Role ADMIN criada com sucesso.');
        } else {
            console.log('Role ADMIN já existe.');
        }
    } catch (error) {
        console.error('Erro ao criar a role ADMIN:', error);
    }
}

async function createReaderRole() {
    try {
        const created = await Role.findOrCreate({
            where: { nome: 'CLIENTE' },
            defaults: { nome: 'CLIENTE' },
        });
        if (created) {
            console.log('Role CLIENTE criada com sucesso.');
        } else {
            console.log('Role CLIENTE já existe.');
        }
    } catch (error) {
        console.error('Erro ao criar a role CLIENTE:', error);
    }
}

createAdminRole();
createReaderRole();