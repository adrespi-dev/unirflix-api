import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rating, RatingSchema } from './rating.schema';
import { Movie, MovieSchema } from './movie.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:root@host.docker.internal:27018/?authMechanism=DEFAULT',
      { dbName: 'tfm_massive' },
    ),
    MongooseModule.forFeature([
      { name: Rating.name, schema: RatingSchema },
      { name: Movie.name, schema: MovieSchema },
    ]),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
