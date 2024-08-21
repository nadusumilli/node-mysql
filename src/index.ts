import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import router from './router';
dotenv.config({
    path: `.env.${process.env.NODE_ENV?.trim() ?? 'development'}`,
});

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('*', router);

app.listen(process.env.APP_PORT ?? 3000, () => {
    console.clear();
    console.log(
        `⚡️[server]: Server is running in ${process.env.NODE_ENV} mode at https://localhost:${process.env.APP_PORT}`
    );
});
