import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from '@Shared/infra/http/routes';
import uploadConfig from '@config/upload';
import AppError from '@Shared/errors/AppError';

import '@Shared/infra/typeorm';
import '@Shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(
  (err: AppError, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      response.status(err.statusCode).json({
        statue: 'error',
        message: err.message,
      });
    }

    console.log(err.message);

    response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);

app.listen(3333, () => {
  console.log('Server started');
});
