import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { Movie } from './movie.schema';
import { Rating } from './rating.schema';

@Controller()
export class AppController {
  constructor(
    @InjectModel(Rating.name) private ratingsModel: Model<Rating>,
    @InjectModel(Movie.name) private moviesModel: Model<Movie>,
    private readonly httpService: HttpService,
  ) {}

  @Get('user/:userId')
  async getUser(@Param() { userId }: { userId: number }) {
    const ratings = await this.ratingsModel
      .find({ userId })
      .sort({ rating: 'desc' })
      .exec();

    const movieIds = ratings.map((r) => r.movieId);
    const movies = await this.moviesModel.find({ movieId: { $in: movieIds } });

    const moviesMap: any = {};
    movies.forEach((m) => {
      moviesMap[m.movieId] = m;
    });

    ratings.forEach((r) => {
      r.movie = moviesMap[r.movieId.toString()];
    });

    return ratings;
  }

  @Post('predict')
  async predict(
    @Body()
    {
      modelId,
      apiKey,
      inputs,
    }: {
      modelId: number;
      apiKey: string;
      inputs: any;
    },
  ) {
    const { data } = await lastValueFrom(
      this.httpService.post(
        `http://host.docker.internal:8000/api/models/${modelId}/predict/`,
        inputs,
        { headers: { Authorization: `Api-Key ${apiKey}` } },
      ),
    );
    return data;
  }
}
