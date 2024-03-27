// src/restaurants/dto/create-review.dto.ts

export class CreateReviewDto {
    readonly content: string;
    readonly rating: number;
    readonly userId?: string; // Optional user ID, assuming anonymous reviews are allowed
  }
  