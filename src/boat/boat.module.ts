import { Module } from '@nestjs/common';
import { BoatService } from './boat.service';
import { BoatController } from './boat.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Boat} from "./boat.model";
import {UserModule} from "../user/user.module";
import {FilesModule} from "../files/files.module";

@Module({
  providers: [BoatService],
  controllers: [BoatController],
  imports:[
      SequelizeModule.forFeature([Boat]),
      UserModule,
      FilesModule
  ],
    exports:[
        BoatService
    ]
})
export class BoatModule {}
