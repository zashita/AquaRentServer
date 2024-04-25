import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {STRING} from "sequelize";
import {User} from "../user/user.model";
import {Order} from "../order/order.model";

interface BoatCreationAttrs{
    name: string;
    owner: string;
    description: string;
}

@Table({tableName: 'boats'})
export class Boat extends Model<Boat, BoatCreationAttrs>{
    @Column({type: DataType.UUID, unique: true, defaultValue: DataType.UUIDV4, primaryKey: true})
    id: string

    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @ForeignKey(()=> User)
    @Column({type: DataType.UUID})
    userId: string;

    
    @Column({type: DataType.STRING})
    description: string

    @HasMany(()=> Order)
    orders: Order[];

    @BelongsTo(()=>User)
    owner: User;

}