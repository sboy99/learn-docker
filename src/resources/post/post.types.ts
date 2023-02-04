import type { Document } from 'mongoose';
import type { z } from 'zod';
import type PostValidation from './post.validation';

type TPost = Document & z.infer<(typeof PostValidation)['create']>;
export default TPost;
