import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import { UserModule } from './user/user.module';
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
import {User} from "./user/user.model";
import { BoatModule } from './boat/boat.module';
import {Boat} from "./boat/boat.model";
import { OrderModule } from './order/order.module';
import {Order} from "./order/order.model";
import { RoleModule } from './role/role.module';
import {Role} from "./role/role.model";
import {UserRole} from "./role/userRoles.model";
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { ReviewModule } from './review/review.module';
import { LakeModule } from './lake/lake.module';
import * as path from 'path'
import {Review} from "./review/review.model";
import {Lake} from "./lake/lake.model";

@Module({
    imports:[
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        ServeStaticModule.forRoot({
            rootPath: path.join(__dirname,'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Boat, Order, Role, UserRole, Review, Lake],
            autoLoadModels: true,
        }),
        UserModule,
        BoatModule,
        OrderModule,
        RoleModule,
        AuthModule,
        FilesModule,
        ReviewModule,
        LakeModule,
    ],
    providers: []
})
export class AppModule{
}