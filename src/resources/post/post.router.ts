import validate from '@/middlewares/validation.middleware';
import type Route from '@/utils/interfaces/route.interfaces';
import { Router } from 'express';
import PostController from './post.controllers';
import PostValidation from './post.validation';

class PostRoute implements Route {
  public path = `/posts`;
  public router = Router();
  private controller = new PostController();
  private validation = PostValidation;

  constructor() {
    this.initializeRoute();
  }

  private initializeRoute(): void {
    this.router
      .route(`${this.path}`)
      .get(this.controller.readAll)
      .post(validate(this.validation.create), this.controller.create);

    this.router
      .route(`${this.path}/:id`)
      .get(this.controller.readSingle)
      .patch(validate(this.validation.update), this.controller.update);
  }
}

export default PostRoute;
