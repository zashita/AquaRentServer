import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {Order} from "../order/order.model";
import {Boat} from "../boat/boat.model";
import {Role} from "../role/role.model";
import {UserRole} from "../role/userRoles.model";
import {Review} from "../review/review.model";

interface UserCreationAttrs{
    email: string;
    password: string;
    name: string
}
@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs>{
    @Column({type: DataType.UUID, unique: true, primaryKey: true, autoIncrement: false, defaultValue: DataType.UUIDV4})
    id: string;

    @Column({type: DataType.STRING, unique: true, allowNull: true})
    name: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    waitingForStatusConfirmation: boolean;

    @Column({type: DataType.STRING})
    picture?: string;

    @HasMany(() => Order)
    orders: Order[]

    @HasMany(()=> Boat)
    boats: Boat[]

    @HasMany(()=>Review)
    reviews: Review[]

    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[]


}