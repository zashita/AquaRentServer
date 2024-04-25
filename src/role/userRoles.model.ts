import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../user/user.model";
import {Role} from "./role.model";


@Table({tableName: 'userRoles'})
export class UserRole extends Model<UserRole>{
    @Column({type: DataType.UUID, unique: true, primaryKey: true, autoIncrement: false, defaultValue: DataType.UUIDV4})
    id: string;

    @ForeignKey(() => User)
    @Column({type: DataType.UUID})
    userId: string;

    @ForeignKey(() => Role)
    @Column({type: DataType.UUID})
    roleId: string;
}