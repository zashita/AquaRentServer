import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Boat} from "./boat.model";
import {BoatCreationDto} from "./dto/boatCreation.dto";
import {UserService} from "../user/user.service";
import {FilesService} from "../files/files.service";

@Injectable()
export class BoatService {
    constructor(@InjectModel(Boat) private boatRepository: typeof Boat,
                private userService: UserService,
                private fileService: FilesService) {
    }

    async create(dto: BoatCreationDto, image: File){
        try {
            const imagePath = await this.fileService.createFile(image);
            const boat = await this.boatRepository.create({...dto, image: imagePath})
            const user = await this.userService.getUserById(dto.userId)
            await user.$add('boats', [boat.id])
            console.log(boat)
            return boat;
        } catch (e) {
            console.log("Ошибка при регистрации лодки", e)
        }
    }

    async getAll(){
        try {
            const boats = await this.boatRepository.findAll();
            return boats
        } catch (e) {
            console.log("Ошибка при выводе лодок")
        }
    }


}
