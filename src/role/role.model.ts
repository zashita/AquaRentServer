import {BelongsToMany, Column, Model, Table} from "sequelize-typescript";
import {UserRole} from "./userRoles.model";
import {User} from "../user/user.model";
interface RoleCreationAttrs{
    name: string;
    description: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs>{
    @Column({primaryKey: true})
    id: string;

    @Column({})
    name: string;

    @Column({})
    description: string

    @BelongsToMany(() => User, () => UserRole)
    users: User[];
}