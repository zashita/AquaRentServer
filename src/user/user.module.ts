import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {Boat} from "../boat/boat.model";
import {Order} from "../order/order.model";
import {Role} from "../role/role.model";
import {UserRole} from "../role/userRoles.model";
import {RoleModule} from "../role/role.module";
import {OrderModule} from "../order/order.module";
import {FilesModule} from "../files/files.module";

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
      SequelizeModule.forFeature([User, Order, Boat, Role, UserRole]), RoleModule, FilesModule
  ],
    exports: [UserService]
})
export class UserModule {}
