# Inicializa o projeto com package.json
npm init -y

# Instala o TypeScript e as dependências básicas
npm install typescript ts-node @types/node --save-dev

# Cria o arquivo de configuração do TypeScript
npx tsc --init

# Express e suas dependências
npm install express body-parser cors helmet morgan express-async-errors

# Sequelize e PostgreSQL
npm install sequelize pg pg-hstore
npm install --save-dev sequelize-cli

# JWT e Bcrypt para autenticação
npm install bcryptjs jsonwebtoken

# Upload de arquivos
npm install multer

# Validação de dados
npm install joi

# Segurança extra e controle de requisições
npm install rate-limiter-flexible

# Variáveis de ambiente
npm install dotenv

# Nodemon para desenvolvimento
npm install --save-dev nodemon

# ESLint e Prettier para qualidade do código
npm install eslint prettier eslint-config-prettier eslint-plugin-prettier --save-dev