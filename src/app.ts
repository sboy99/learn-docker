import errorHandlerMiddleware from '@/middlewares/errorHandler.middleware';
import notFoundMiddlewre from '@/middlewares/notFound.middleware';
import type Route from '@/utils/interfaces/route.interfaces';
import compression from 'compression';
import cors from 'cors';
import type { Application } from 'express';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';

class App {
  public express: Application;
  public port: number;

  constructor(routes: Route[], port: number) {
    this.express = express();
    this.port = port;

    this.initializeDatabaseConnection();
    this.initialiseMiddleware();
    this.initializeRoutes(routes);
    this.initializeUnknownRouteHandling();
    this.initializeErrorHandling();
  }

  private initializeDatabaseConnection(): void {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
    mongoose.set('strictQuery', true);

    mongoose
      .connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH}`)
      .then(() => console.log(`Conntected to DB`))
      .catch((e) => console.log(e));
  }

  private initialiseMiddleware(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
  }

  private initializeRoutes(routes: Route[]): void {
    routes.forEach((route) => {
      this.express.use(`/api/v1`, route.router);
    });
  }

  private initializeUnknownRouteHandling(): void {
    this.express.use(notFoundMiddlewre);
  }

  private initializeErrorHandling(): void {
    this.express.use(errorHandlerMiddleware);
  }

  public listen() {
    this.express.listen(this.port, () => {
      console.log(`Server is listening on port ${this.port}`);
    });
  }
}

export default App;
