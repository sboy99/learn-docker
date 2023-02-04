import type { RequestHandler } from 'express';
import PostModel from './post.model';

class PostController {
  // create post
  public create: RequestHandler = async (req, res) => {
    const post = await PostModel.create(req.body);
    res.status(200).json(post);
  };

  // read all post
  public readAll: RequestHandler = async (req, res) => {
    const posts = await PostModel.find();
    res.status(200).json({ count: posts.length, posts });
  };

  // read single post
  public readSingle: RequestHandler = async (req, res) => {
    res.status(200).json({ message: `Read single posts` });
  };

  // update post
  public update: RequestHandler = (req, res) => {
    res.status(200).json(req.body);
  };
  // delete post
}

export default PostController;
