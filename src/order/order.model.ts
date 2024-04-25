import {BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {User} from "../user/user.model";
import {Boat} from "../boat/boat.model";

interface OrderCreationAttrs{
    user: string;
    boat: string;
    date: string;
}

@Table({tableName: 'orders'})
export class Order extends Model<Order, OrderCreationAttrs>{
    @Column({type: DataType.UUID, primaryKey: true, unique: true, defaultValue: DataType.UUIDV4})
    id: string;

    @Column({type: DataType.STRING, allowNull: false})
    date: string;

    @Column({type: DataType.STRING, allowNull: false, defaultValue: 'processing'})
    state: string;

    @ForeignKey(()=> User)
    @Column({type: DataType.UUID})
    userId: string;

    @ForeignKey(()=> Boat)
    @Column({type: DataType.UUID})
    boatId: string;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Boat)
    boat: Boat;
}