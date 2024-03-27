"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const restaurant_schema_1 = require("./schemas/restaurant.schema");
let RestaurantsService = class RestaurantsService {
    constructor(restaurantModel, reviewModel) {
        this.restaurantModel = restaurantModel;
        this.reviewModel = reviewModel;
    }
    async createReview(restaurantId, createReviewDto) {
        const newReview = new this.reviewModel({
            ...createReviewDto,
            restaurantId,
        });
        return newReview.save();
    }
    async findReviewsByRestaurantId(restaurantId) {
        const reviews = await this.reviewModel.find({ restaurantId }).exec();
        if (!reviews) {
            throw new common_1.NotFoundException(`Reviews not found for restaurant with ID ${restaurantId}`);
        }
        return reviews;
    }
    async findTrendingRestaurants() {
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
};
exports.RestaurantsService = RestaurantsService;
exports.RestaurantsService = RestaurantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(restaurant_schema_1.Restaurant.name)),
    __param(1, (0, mongoose_1.InjectModel)('Review')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], RestaurantsService);
//# sourceMappingURL=restaurants.service.js.map