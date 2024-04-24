import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Order} from "./order.model";

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports: [
      SequelizeModule.forFeature([Order])
  ]
})
export class OrderModule {}
