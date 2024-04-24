import {Column, DataType, Model, Table} from "sequelize-typescript";
import {STRING} from "sequelize";

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

    @Column({type: DataType.STRING})
    owner: string

    @Column({type: DataType.STRING})
    description: string

    @Column({type: DataType.ARRAY(STRING), defaultValue: []})
    orders: string

}