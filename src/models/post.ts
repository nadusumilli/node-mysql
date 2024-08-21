import { DataTypes, Sequelize } from 'sequelize';
import db from './index';

const Post = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    const Post = sequelize.define('Post', {
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

    return Post;
};

export const createNewPost = async (post: typeof db.Post) => {
    try {
        return [await db.Post.create(post), null];
    } catch (e: any) {
        return [null, e];
    }
};

export const findPost = async (id: string) => {
    try {
        return [
            await db.Post.findOne({
                where: {
                    id,
                },
            }),
            null,
        ];
    } catch (e: any) {
        return [null, e];
    }
};

export const findAllPosts = async () => {
    try {
        return [await db.Post.findAll(), null];
    } catch (e: any) {
        return [null, e];
    }
};

export const updatePostById = async (id: number, post: typeof db.Post) => {
    try {
        return [await db.Post.update(post, { where: { id } }), null];
    } catch (e: any) {
        return [null, e];
    }
};

export const deletePostById = async (id: string) => {
    try {
        return [
            await db.Post.destroy({
                where: {
                    id,
                },
            }),
            null,
        ];
    } catch (e: any) {
        return [null, e];
    }
};

export default Post;
