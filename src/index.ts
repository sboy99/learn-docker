import 'dotenv/config';
import 'express-async-errors';
import 'module-alias/register';

import PostRoute from '@/resources/post/post.router';
// import validateEnv from '@/utils/validate.env';
import App from './app';

// validateEnv();
const app = new App([new PostRoute()], Number(process.env?.PORT ?? 5000));
app.listen();
