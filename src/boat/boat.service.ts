import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Boat} from "./boat.model";
import {BoatCreationDto} from "./dto/boatCreation.dto";
import {UserService} from "../user/user.service";
import {FilesService} from "../files/files.service";
import {where} from "sequelize";
import {LakeService} from "../lake/lake.service";

@Injectable()
export class BoatService {
    constructor(@InjectModel(Boat) private boatRepository: typeof Boat,
                private userService: UserService,
                private fileService: FilesService,
                private lakeService: LakeService) {
    }

    async create(dto: BoatCreationDto, image: File){
        try {
            const imagePath = await this.fileService.createFile(image);
            const captain = dto.captain === 'true';
            const user = await this.userService.getUserById(dto.userId);
            const lake = await this.lakeService.getById(dto.lakeId);
            console.log("DTO ",dto)
            console.log("CAPTAIN ",captain)
            const normalDto = {
                ...dto,
                image: imagePath,
                price: Number(dto.price),
                passengerCapacity: Number(dto.passengerCapacity),
                captain: captain,
                lakeName: lake.name,
                userEmail: user.email
            }
            console.log("NORMAL",normalDto)

            const boat = await this.boatRepository.create(normalDto)
            console.log("BOAT", boat)

            await lake.$add('boats', [boat.id])
            await user.$add('boats', [boat.id])

            console.log(boat)
            return boat;
        } catch (e) {
            console.log("Ошибка при регистрации лодки", e)
        }
    }

    async getAll(){
        try {
            const boats = await this.boatRepository.findAll({include: {all: true}});
            return boats
        } catch (e) {
            console.log("Ошибка при выводе лодок")
        }
    }

    async getBoatById(id: string): Promise<Boat>{
        try {
            const boat = await this.boatRepository.findOne({where: {id}})
            if(!boat){
                throw new HttpException( HttpStatus,.404)
            }
            return boat;
        } catch (e) {
            console.log(e, 'Ошибка при промотре лодки')

        }
    }

    async deleteById(id: string){
        try {
            const boat = await this.boatRepository.destroy({where: {id}})
            return boat
        } catch (e) {
            console.log(e, 'Ошибка при удалении лодки')
        }
    }

    async increaseViews(id: string){
        try {
            const boat = await this.boatRepository.findOne({where:{id}})
            return await boat.increment('views')
        }
        catch (e) {
            console.log(e)
        }
    }


}
