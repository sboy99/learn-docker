import { Schema, model } from 'mongoose';
import type TPost from './post.types';

const postSchema = new Schema<TPost>(
  {
    title: {
      type: String,
      required: [true, 'Title of the post is required'],
      minlength: [5, 'Minimum length of title should be 5'],
      maxlength: [50, 'Title should be maximum 50 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content of the post is required'],
    },
  },
  { timestamps: true, validateBeforeSave: true }
);

export default model<TPost>('Post', postSchema);
