import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {STRING} from "sequelize";
import {User} from "../user/user.model";
import {Order} from "../order/order.model";
import {Lake} from "../lake/lake.model";

interface BoatCreationAttrs{
    name: string;
    userId: string;
    description: string;
    image: string
    price: number;
    lakeId: string;
    lakeName: string
    passengerCapacity: number;
    moveType: string;
    captain: boolean;
    userEmail: string;
}

export enum BoatTypes{
    YACHT = 'Яхта',
    BOAT = 'Катер',
    KATAMARAN = 'Катамаран',
    HYDROCYCLE= 'Гидроцикл'
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
    userEmail: string;

    @Column({type: DataType.STRING})
    lakeName: string;

    @ForeignKey(() => Lake)
    @Column({type: DataType.UUID})
    lakeId: string;

    @Column({type: DataType.STRING, defaultValue: BoatTypes.YACHT})
    type: BoatTypes;

    @Column({type: DataType.STRING})
    moveType: string

    @Column({type: DataType.INTEGER})
    price: number

    @Column({type: DataType.BOOLEAN})
    captain: boolean

    @Column({type: DataType.INTEGER})
    passengerCapacity: number

    @Column({type: DataType.INTEGER, defaultValue: 0})
    views: number;
    
    @Column({type: DataType.STRING})
    description: string;

    @Column({type: DataType.STRING})
    image: string

    @HasMany(()=> Order)
    orders: Order[];

    @BelongsTo(()=>User)
    owner: User;

    @BelongsTo(()=> Lake)
    lake: Lake

}