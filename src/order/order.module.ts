import {forwardRef, Module} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Order} from "./order.model";
import {UserModule} from "../user/user.module";
import {BoatModule} from "../boat/boat.module";
import {MailModule} from "../mail/mail.module";

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports: [
      SequelizeModule.forFeature([Order]),
      UserModule,
      forwardRef(()=> BoatModule),
      MailModule
  ],
    exports: [OrderService]
})
export class OrderModule {}
