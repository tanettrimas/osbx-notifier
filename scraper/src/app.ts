import express, { Request, Response, NextFunction } from 'express';
import logger from 'morgan';

import routes from './routes';

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  return next(new Error(`Route ${req.originalUrl} was not found!`));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  return res.send({
    url: req.originalUrl,
    message: error.message,
    stacktrace: process.env.NODE_ENV !== 'production' ? error.stack : null,
  });
});

export default app;
