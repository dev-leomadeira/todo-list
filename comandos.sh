npm init -y
npm install express body-parser express-validator multer pg sequelize typescript @types/node @types/express ts-node
npm install express sequelize pg pg-hstore bcryptjs jsonwebtoken body-parser dotenv
npm install typescript --save-dev
npm install typescript ts-node @types/express @types/node --save-dev
npm install --save-dev nodemon @types/bcryptjs @types/jsonwebtoken @types/body-parser
npx tsc --init

npx ts-node src/scripts/init-db.ts // inicializa o banco de dados