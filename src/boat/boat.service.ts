import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Boat} from "./boat.model";
import {BoatCreationDto} from "./dto/boatCreation.dto";

@Injectable()
export class BoatService {
    constructor(@InjectModel(Boat) private boatRepository: typeof Boat) {
    }

    async create(dto: BoatCreationDto){
        try {
            const boat = await this.boatRepository.create(dto)
            return boat;
        } catch (e) {
            console.log("Ошибка при регистрации лодки")
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
