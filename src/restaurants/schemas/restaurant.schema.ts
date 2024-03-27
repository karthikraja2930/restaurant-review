import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RestaurantDocument = Restaurant & Document;

@Schema()
export class Restaurant {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  cuisine: string;

  @Prop()
  location: string;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
