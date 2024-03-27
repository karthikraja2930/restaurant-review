// src/restaurants/restaurants.controller.ts

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post(':restaurantId/reviews')
  async createReview(
    @Param('restaurantId') restaurantId: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return await this.restaurantsService.createReview(restaurantId, createReviewDto);
  }

  @Get(':restaurantId/reviews')
  async getReviews(@Param('restaurantId') restaurantId: string) {
    return await this.restaurantsService.findReviewsByRestaurantId(restaurantId);
  }

  @Get('trending')
  async getTrendingRestaurants() {
    return await this.restaurantsService.findTrendingRestaurants();
  }
}
