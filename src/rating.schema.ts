import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Movie } from './movie.schema';

export type RatingDocument = HydratedDocument<Rating>;

@Schema({ collection: 'ratings' })
export class Rating {
  @Prop()
  userId: number;

  @Prop()
  movieId: number;

  @Prop()
  rating: number;

  @Prop()
  gender: string;

  @Prop()
  movie: Movie;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
