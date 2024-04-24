import {Column, DataType, Model, Table} from "sequelize-typescript";

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
    user: string;

    @Column({type: DataType.STRING, allowNull: false})
    boat: string;

    @Column({type: DataType.STRING, allowNull: false})
    date: string;

    @Column({type: DataType.STRING, allowNull: false, defaultValue: 'processing'})
    state: string;
}