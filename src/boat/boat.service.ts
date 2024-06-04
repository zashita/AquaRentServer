import {forwardRef, HttpException, HttpStatus, Inject, Injectable, Query} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Boat, BoatTypes, MoveType} from "./boat.model";
import {BoatCreationDto} from "./dto/boatCreation.dto";
import {UserService} from "../user/user.service";
import {FilesService} from "../files/files.service";
import {Op, where} from "sequelize";
import {LakeService} from "../lake/lake.service";
import {OrderService} from "../order/order.service";
import {Order} from "../order/order.model";

@Injectable()
export class BoatService {
    constructor(@InjectModel(Boat) private boatRepository: typeof Boat,
                private userService: UserService,
                private fileService: FilesService,
                private lakeService: LakeService,
                @Inject(forwardRef(() => OrderService))
                private orderService: OrderService,
                @InjectModel(Order) private orderRepository: typeof Order
    ) {
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
                userEmail: user.email,
                confirmed: false
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

    async getAll(type?: string,
                 passengerCapacity?: number,
                 lakeName?: string,
                 price?: number,
                 captain?: boolean){
        try {
            const params = [];
            if (type) params.push({})
            const boats = await this.boatRepository.findAll(
                {
                    where: {confirmed: true},
                    attributes: {exclude: ['orders', 'userId', 'lakeId', 'description', 'updatedAt', 'userEmail']},
                    order: [['id' , 'DESC']]


                });

            return boats
        } catch (e) {
            console.log(e, "Ошибка при выводе лодок")
        }
    }

    async getAllAdmin(type?: string,
                 passengerCapacity?: number,
                 lakeName?: string,
                 price?: number,
                 captain?: boolean){
        try {
            const boats = await this.boatRepository.findAll({include: {all: true},
            order: [['id' , 'DESC']]});
            return boats
        } catch (e) {
            console.log(e, "Ошибка при выводе лодок")
        }
    }

    async filter(type: BoatTypes,
                 moveType: MoveType,
                 lakeName: string,
                 captain: boolean){
        try {
            const boats = await this.boatRepository.findAll({include: {all: true},
                where:{type, lakeName, captain, moveType, confirmed: true}});
            return boats

            // const boats2 = await this.boatRepository.findAll({where:{
            //     type: {$regex: new RegExp(type, 'i')},
            //     lakeName: {$regex: new RegExp(lakeName, 'i')}
            //
            //     }})
        } catch (e) {
            console.log(e, "Ошибка при выводе лодок")
        }
    }

    async confirmBoat(id: string){
        const boat = await this.boatRepository.findOne({where: {id}})
        boat.confirmed = true;
        await boat.save();
        return boat;
    }
    async getBoatById(id: string): Promise<Boat>{
        try {
            const boat = await this.boatRepository.findOne({where: {id}, include: {all: true}})
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
            const boat = await this.boatRepository.findOne({where: {id}})
            const orders = await this.orderRepository.destroy({where: {boatId: id}})
            await boat.destroy();
            // await orders.map((order)=> {
            //
            // })
            return boat;
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
