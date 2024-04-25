import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {Order} from "../order/order.model";
import {Boat} from "../boat/boat.model";
import {Role} from "../role/role.model";
import {UserRole} from "../role/userRoles.model";

interface UserCreationAttrs{
    name: string;
    password: string;
}
@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs>{
    @Column({type: DataType.UUID, unique: true, primaryKey: true, autoIncrement: false, defaultValue: DataType.UUIDV4})
    id: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @HasMany(() => Order)
    orders: Order[]

    @HasMany(()=> Boat)
    boats: Boat[]

    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[]


}