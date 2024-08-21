import { DataTypes, Sequelize } from 'sequelize';

const Posts = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    const posts = sequelize.define('posts', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        creator: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        tags: {
            type: dataTypes.STRING,
        },
        selectedFile: {
            type: dataTypes.STRING,
        },
        likeCount: {
            type: dataTypes.INTEGER,
            defaultValue: 0,
        },
    });

    return posts;
};

export default Posts;
