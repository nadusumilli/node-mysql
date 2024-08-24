import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import db from './models';
import router from './router';
dotenv.config({
    path: `.env.${process.env.NODE_ENV?.trim() ?? 'development'}`,
});

console.clear();
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/api/v1/', router);

console.log(`Running database queries...\n`);

db.sequelize.sync({ alter: true }).then(() => {
    console.clear();
    console.log(`\nStarting server...`);
    app.listen(process.env.APP_PORT ?? 3000, () => {
        console.log(
            `\n⚡️[server]: Server is running in ${process.env.NODE_ENV} mode at https://localhost:${process.env.APP_PORT}\n\n`
        );
    });
});
