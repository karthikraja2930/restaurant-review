import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant } from './schemas/restaurant.schema';
import { Review } from './schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';


@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
    @InjectModel('Review') private readonly reviewModel: Model<Review>,
  ) {}

  // Existing methods...
  async createReview(restaurantId: string, createReviewDto: CreateReviewDto): Promise<Review> {
    const newReview = new this.reviewModel({
      ...createReviewDto,
      restaurantId,
    });
    return newReview.save();
  }
  async findReviewsByRestaurantId(restaurantId: string): Promise<Review[]> {
    const reviews = await this.reviewModel.find({ restaurantId }).exec();
    if (!reviews) {
      throw new NotFoundException(`Reviews not found for restaurant with ID ${restaurantId}`);
    }
    return reviews;
  }

  async findTrendingRestaurants(): Promise<any> {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return this.reviewModel.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: "$restaurantId",
          averageRating: { $avg: "$rating" }
        }
      },
      {
        $sort: { averageRating: -1 }
      },
      {
        $limit: 5
      },
      {
        $lookup: {
          from: "restaurants",
          localField: "_id",
          foreignField: "_id",
          as: "restaurantInfo"
        }
      },
      {
        $unwind: "$restaurantInfo"
      }
    ]).exec();
  }

}
