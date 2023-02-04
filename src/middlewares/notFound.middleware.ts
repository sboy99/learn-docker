import type { RequestHandler } from 'express';

const notFoundMiddlewre: RequestHandler = (req, res) => {
  res.status(404).json({ message: `Route does not exist` });
};

export default notFoundMiddlewre;
