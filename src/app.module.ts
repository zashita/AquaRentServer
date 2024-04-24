import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import { UserModule } from './user/user.module';
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
import {User} from "./user/user.model";
import { BoatModule } from './boat/boat.module';
import {Boat} from "./boat/boat.model";
import { OrderModule } from './order/order.module';

@Module({
    imports:[
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Boat],
            autoLoadModels: true,
        }),
        UserModule,
        BoatModule,
        OrderModule,
    ],
    providers: []
})
export class AppModule{
}