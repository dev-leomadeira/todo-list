import bcrypt from 'bcryptjs';
import User from '../models/usuario.model';
import Role from '../models/papel.model';

async function createAdminUser() {
    try {
        // Encontre a role ADMIN
        const adminRole = await Role.findOne({ where: { nome: 'ADMIN' } });

        if (!adminRole) {
            console.error('Role ADMIN não encontrada. Certifique-se de criar a role primeiro.');
            return;
        }

        // Verifique se o admin já existe
        const existingAdmin = await User.findOne({ where: { email: 'admin@gmail.com' } });

        if (existingAdmin) {
            console.log('Usuário admin já existe.');
            return;
        }

        // Crie o usuário admin
        const hashedPassword = await bcrypt.hash('root', 10);
        const adminUser = await User.create({
            nome: 'admin',
            email: 'admin@gmail.com',
            senha: hashedPassword,
            papelId: adminRole.id,
        });

        console.log('Usuário admin criado com sucesso:', adminUser.email);
    } catch (error) {
        console.error('Erro ao criar o usuário admin:', error);
    }
}

createAdminUser();
