import process from 'process';
import { DataTypes, Sequelize } from 'sequelize';
import databaseConfigs from '../config/config.json';
import Comment from './comment';
import Post from './post';
import Story from './story';
import User from './user';

const db: { [key: string]: any } = {};
const config = (databaseConfigs as any)[process.env.NODE_ENV ?? 'development'];

let sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    { ...config }
);

const models: any = {
    User: User(sequelize, DataTypes),
    Post: Post(sequelize, DataTypes),
    Story: Story(sequelize, DataTypes),
    Comment: Comment(sequelize, DataTypes),
};

Object.keys(models).forEach((modelName) => {
    db[modelName] = models[modelName];
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
