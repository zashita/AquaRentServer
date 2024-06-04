import {BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {User} from "../user/user.model";
import {Boat} from "../boat/boat.model";

interface OrderCreationAttrs{
    user: string;
    userEmail: string;
    boat: string;
    date: number;
    dateEnd: number;
    price: number;
}

export enum OrderStates{
    WAITING = "Заказ ожидает подверждения арендодателя",
    CONFIRMED = 'Заказ подтвержден арендодателем',
    FINISHED = 'Заказ завершен, вы можете оставить отзыв'
}

@Table({tableName: 'orders'})
export class Order extends Model<Order, OrderCreationAttrs>{
    @Column({type: DataType.UUID, primaryKey: true, unique: true, defaultValue: DataType.UUIDV4})
    id: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    date: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    dateEnd: number;

    @Column({type: DataType.FLOAT, allowNull: false})
    price: number;

    @Column({type: DataType.STRING, allowNull: false, defaultValue: OrderStates.WAITING})
    state: OrderStates;

    @ForeignKey(()=> User)
    @Column({type: DataType.UUID})
    userId: string;

    @ForeignKey(()=>User)
    @Column({type: DataType.STRING})
    userEmail: string

    @ForeignKey(()=> Boat)
    @Column({type: DataType.UUID})
    boatId: string;


    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Boat)
    boat: Boat;
}