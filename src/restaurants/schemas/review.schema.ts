import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Restaurant } from './restaurant.schema';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ type: Types.ObjectId, ref: Restaurant.name, required: true })
  restaurantId: Types.ObjectId | Restaurant;

  @Prop()
  userId: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
