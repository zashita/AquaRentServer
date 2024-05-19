import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Review} from "./review.model";
import {BoatModule} from "../boat/boat.module";
import {UserModule} from "../user/user.module";

@Module({
  providers: [ReviewService],
  controllers: [ReviewController],
  imports:[
      SequelizeModule.forFeature([Review]),
      BoatModule,
      UserModule,
  ]
})
export class ReviewModule {}
