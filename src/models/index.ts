import fs from 'fs';
import path from 'path';
import process from 'process';
import { DataTypes, Sequelize } from 'sequelize';
import databaseConfigs from '../config/config.json';

const db: { [key: string]: any } = {};
const basename = path.basename(__filename);
const config = (databaseConfigs as any)[process.env.NODE_ENV ?? 'development'];

let sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    { ...config }
);

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            (file.slice(-3) === '.js' || file.slice(-3) === '.ts') &&
            file.indexOf('.test.js') === -1
        );
    })
    .forEach(async (file) => {
        const model = await import(path.join(__dirname, file)).then(
            (module) => {
                return module.default(sequelize, DataTypes);
            }
        );
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
