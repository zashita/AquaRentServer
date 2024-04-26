import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./role.model";
import {RoleCreationDto} from "./dto/roleCreation.dto";

@Injectable()
export class RoleService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role) {
    }
    async create(dto: RoleCreationDto): Promise<Role>{
        const role = await this.roleRepository.create(dto);
        return role;
    }

    async getAll(): Promise<Role[]>{
        const roles = await this.roleRepository.findAll();
        return roles;
    }

    async getRoleByValue(value: string): Promise<Role>{
        const role = await this.roleRepository.findOne({where: {value}});
        return role
    }
}
