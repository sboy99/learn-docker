import { z } from 'zod';

const create = z.object({
  title: z
    .string({
      invalid_type_error: `Title should be a string`,
      required_error: `Title is required for a post`,
    })
    .min(5, `Post title should be atleast 5 letters long`)
    .max(50, `Title is too long`),
  content: z.string({
    invalid_type_error: `Content sould be a string`,
    required_error: `Content is required for a post`,
  }),
});

const update = z.object({
  title: z
    .string()
    .min(5, `Post title should be atleast 5 letters long`)
    .max(50, `Title is too long`)
    .optional(),
  content: z.string().optional(),
});

const PostValidation = { create, update };
export default PostValidation;
