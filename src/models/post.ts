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
            type: dataTypes.STRING(200),
            allowNull: false,
        },
        image: {
            type: dataTypes.STRING,
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
        createdAt: {
            type: dataTypes.DATE,
            allowNull: false,
            defaultValue: dataTypes.NOW,
        },
        updatedAt: {
            type: dataTypes.DATE,
            allowNull: false,
            defaultValue: dataTypes.NOW,
        },
        createdBy: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        },
        updatedBy: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        },
    });

    return Post;
};

// Calling the database to create a new post.
export const createNewPost = async (post: typeof db.Post) => {
    try {
        return [await db.Post.create(post), null];
    } catch (e: any) {
        return [null, e];
    }
};

// Calling the database to find a post by id.
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

// Calling the database to update a fetch all posts.
export const findAllPosts = async () => {
    try {
        return [await db.Post.findAll(), null];
    } catch (e: any) {
        return [null, e];
    }
};

// Calling the database to update a post by id.
export const updatePostById = async (id: number, post: typeof db.Post) => {
    try {
        return [await db.Post.update(post, { where: { id } }), null];
    } catch (e: any) {
        return [null, e];
    }
};

// Calling the database to delete a post by id.
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
