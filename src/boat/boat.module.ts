import { Module } from '@nestjs/common';
import { BoatService } from './boat.service';
import { BoatController } from './boat.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Boat} from "./boat.model";

@Module({
  providers: [BoatService],
  controllers: [BoatController],
  imports:[
      SequelizeModule.forFeature([Boat])
  ]
})
export class BoatModule {}
