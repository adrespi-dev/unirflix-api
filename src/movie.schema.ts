import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema({ collection: 'movies' })
export class Movie {
  @Prop()
  movieId: number;

  @Prop()
  title: string;

  @Prop()
  genres: string[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
