import { DataTypes, Sequelize } from 'sequelize';
import db from './index';

const Comment = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        comment: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        postId: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Posts',
                key: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        },
        storyId: {
            type: dataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Stories',
                key: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
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

    return Comment;
};

export const createNewComment = async (comment: typeof db.Comment) => {
    try {
        const newComment = await db.Comment.create(comment);
        return [newComment, null];
    } catch (error) {
        return [null, error];
    }
};

export const findAllComments = async () => {
    try {
        const comments = await db.Comment.findAll();
        return [comments, null];
    } catch (error) {
        return [null, error];
    }
};

export const findCommentById = async (id: number) => {
    try {
        const comment = await db.Comment.findByPk(id);
        return [comment, null];
    } catch (error) {
        return [null, error];
    }
};

export const updateComment = async (id: number, comment: typeof db.Comment) => {
    try {
        const updatedComment = await db.Comment.update(comment, {
            where: { id },
        });
        return [updatedComment, null];
    } catch (error) {
        return [null, error];
    }
};

export const deleteComment = async (id: number) => {
    try {
        const comment = await db.Comment.destroy({ where: { id } });
        return [comment, null];
    } catch (error) {
        return [null, error];
    }
};

export default Comment;
