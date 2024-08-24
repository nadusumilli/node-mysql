import bcrypt from 'bcrypt';
import { DataTypes, Sequelize } from 'sequelize';
import db from './index';

const User = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: dataTypes.STRING(200),
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        profilePicture: {
            type: dataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: dataTypes.ENUM('user', 'admin'),
            allowNull: false,
        },
        city: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        avatar: {
            type: dataTypes.STRING,
            allowNull: true,
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
        coverPicture: {
            type: dataTypes.STRING,
            allowNull: true,
        },
        followers: {
            type: dataTypes.STRING,
            allowNull: true,
        },
        followings: {
            type: dataTypes.STRING,
            allowNull: true,
        },
        desc: {
            type: dataTypes.STRING,
            allowNull: true,
        },
        from: {
            type: dataTypes.STRING,
            allowNull: true,
        },
        relationshipStatus: {
            type: dataTypes.INTEGER,
            allowNull: true,
        },
    });

    return User;
};

const findAllUsers = async () => {
    try {
        const users = await db.User.findAll();
        return [users, null];
    } catch (error) {
        return [null, error];
    }
};

const findUserById = async (id: number) => {
    try {
        const user = await db.User.findByPk(id);
        return [user, null];
    } catch (error) {
        return [null, error];
    }
};

const findUserByUserName = async (username: string) => {
    try {
        const user = await db.User.findOne({ where: { username } });
        return [user, null];
    } catch (error) {
        return [null, error];
    }
};

const createNewUser = async (user: typeof db.User) => {
    // Consider using a more specific type for user
    try {
        if (!user) {
            return [null, 'User data is required'];
        }

        const validationErrors = await db.User.build(user).validate();

        if (validationErrors.errors) {
            // Format validation errors into a user-friendly message or return the errors object directly
            const errorMessage = validationErrors.errors
                .map((error: any) => `${error.path}: ${error.message}`)
                .join('\n');
            return [null, errorMessage];
        }

        const existingUser = await db.User.findOne({
            where: { email: user.email },
        });

        if (existingUser) {
            return [null, 'User already exists'];
        }

        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(12)); // Consider increasing salt rounds

        const newUser = await db.User.create(user);
        return [newUser, null];
    } catch (error) {
        // Handle specific error types if needed
        console.error('Error creating user:', error);
        return [null, 'An error occurred while creating the user'];
    }
};

const updateUser = async (id: number, user: typeof db.User) => {
    try {
        const [rows, [updatedUser]] = await db.User.update(user, {
            where: { id },
            returning: true,
        });

        return [updatedUser, null];
    } catch (error) {
        return [null, error];
    }
};

const deleteUser = async (id: number) => {
    try {
        const user = await db.User.findByPk(id);
        await user.destroy();
        return [user, null];
    } catch (error) {
        return [null, error];
    }
};

export {
    createNewUser,
    deleteUser,
    findAllUsers,
    findUserById,
    findUserByUserName,
    updateUser,
};

export default User;
