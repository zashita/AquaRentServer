import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {UserRole} from "./userRoles.model";
import {User} from "../user/user.model";
interface RoleCreationAttrs{
    name: string;
    description: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs>{
    @Column({primaryKey: true, unique: true, type: DataType.UUID, defaultValue: DataType.UUIDV4})
    id: string;

    @Column({type: DataType.STRING, unique: true})
    value: string;

    @Column({})
    description: string

    @BelongsToMany(() => User, () => UserRole)
    users: User[];
}