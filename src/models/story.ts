import { DataTypes, Sequelize } from 'sequelize';
import db from './index';

const Story = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    const Story = sequelize.define('Story', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        image: {
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

    return Story;
};

export const createNewStory = async (story: any) => {
    try {
        const newStory = await db.Story.create(story);
        return [newStory, null];
    } catch (error) {
        return [null, error];
    }
};

export const findAllStories = async () => {
    try {
        const stories = await db.Story.findAll();
        return [stories, null];
    } catch (error) {
        return [null, error];
    }
};

export const findStoryById = async (id: number) => {
    try {
        const story = await db.Story.findByPk(id);
        return [story, null];
    } catch (error) {
        return [null, error];
    }
};

export const updateStory = async (id: number, story: any) => {
    try {
        await db.Story.update(story, {
            where: { id },
        });

        return [story, null];
    } catch (error) {
        return [null, error];
    }
};

export const deleteStory = async (id: number) => {
    try {
        const story = await db.Story.findByPk(id);
        await story.destroy();
        return [story, null];
    } catch (error) {
        return [null, error];
    }
};

export default Story;
