import {Column, DataType, Model, Table} from "sequelize-typescript";

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


}