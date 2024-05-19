import { Module } from '@nestjs/common';
import { LakeService } from './lake.service';
import { LakeController } from './lake.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Lake} from "./lake.model";

@Module({
  providers: [LakeService],
  controllers: [LakeController],
  imports:[
      SequelizeModule.forFeature([Lake])
  ],
  exports: [LakeService]
})
export class LakeModule {}
