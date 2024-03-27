import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    RestaurantsModule,
  ],
})
export class AppModule {}
