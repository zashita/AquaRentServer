import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {UserCreationDto} from "./dto/userCreation.dto";

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private userRepository: typeof User) {
    }

    async createUser(dto: UserCreationDto){
        try {
            const user = await this.userRepository.create(dto)
            return user;
        }
        catch (e) {
            console.log(`${e} Ошибка при создании пользователя`)
        }
    }

    async getAllUsers(){
        try {
            const users = await this.userRepository.findAll()
            return users;
        }
        catch (e) {
            console.log(`${e} Ошибка при выводе всех пользователя`)
        }
    }
}
