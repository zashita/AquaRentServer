import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {UserCreationDto} from "./dto/userCreation.dto";
import {RoleService} from "../role/role.service";

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RoleService) {
    }

    async createUser(dto: UserCreationDto){
        try {
            const user = await this.userRepository.create(dto)
            console.log(dto)
            const userRole = await this.roleService.getRoleByValue('USER')

            await user.$set('roles', [userRole.id]);
            console.log(user)
            user.roles = [userRole]



            return user;
        }
        catch (e) {
            console.log(`${e} Ошибка при создании пользователя`)
        }
    }

    async getAllUsers(){
        try {
            const users = await this.userRepository.findAll({include: {all: true}})
            return users;
        }
        catch (e) {
            console.log(`${e} Ошибка при выводе всех пользователя`)
        }
    }

    async getUserByEmail(email: string){
        const user = this.userRepository.findOne({where: {email}})
        return user;
    }
    async getUserById(id: string){
        const user = this.userRepository.findOne({where: {id}})
        return user;
    }
}
