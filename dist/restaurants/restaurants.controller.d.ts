import { CreateReviewDto } from './dto/create-review.dto';
import { RestaurantsService } from './restaurants.service';
export declare class RestaurantsController {
    private readonly restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    createReview(restaurantId: string, createReviewDto: CreateReviewDto): Promise<import("src/restaurants/schemas/review.schema").Review>;
    getReviews(restaurantId: string): Promise<import("src/restaurants/schemas/review.schema").Review[]>;
    getTrendingRestaurants(): Promise<any>;
}
