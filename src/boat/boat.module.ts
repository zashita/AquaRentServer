import {forwardRef, Module} from '@nestjs/common';
import { BoatService } from './boat.service';
import { BoatController } from './boat.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Boat} from "./boat.model";
import {UserModule} from "../user/user.module";
import {FilesModule} from "../files/files.module";
import {LakeModule} from "../lake/lake.module";
import {OrderService} from "../order/order.service";
import {OrderModule} from "../order/order.module";
import {Order} from "../order/order.model";

@Module({
  providers: [BoatService],
  controllers: [BoatController],
  imports:[
      SequelizeModule.forFeature([Boat, Order]),
      UserModule,
      FilesModule,
      LakeModule,
      forwardRef(() => OrderModule)
  ],
    exports:[
        BoatService
    ]
})
export class BoatModule {}
