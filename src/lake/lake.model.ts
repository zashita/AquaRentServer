import {BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {User} from "../user/user.model";
import {Boat} from "../boat/boat.model";

interface LakeCreationAttrs{
    name: string;
}



@Table({tableName: 'lakes'})
export class Lake extends Model<Lake, LakeCreationAttrs>{
    @Column({type: DataType.UUID, primaryKey: true, unique: true, defaultValue: DataType.UUIDV4})
    id: string;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @HasMany(() => Boat)
    boats: Boat[];
}