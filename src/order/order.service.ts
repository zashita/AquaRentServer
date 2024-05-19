import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../user/user.model";
import {Order} from "./order.model";
import {OrderCreationDto} from "./dto/OrderCreation.dto";
import {UserService} from "../user/user.service";
import {BoatService} from "../boat/boat.service";

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order) private orderRepository: typeof Order,
                                    private userService: UserService,
                                    private boatService: BoatService,
    ) {
    }

    async create(dto: OrderCreationDto): Promise<Order>{
        try{
            const user = await this.userService.getUserById(dto.user);
            const boat = await this.boatService.getBoatById(dto.boat);
            const order = await this.orderRepository.create({...dto, userEmail: user.email});

            if(!user || !boat){
                throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
            }
            await boat.$add('orders', [order.id])
            await user.$add('orders', [order.id])
            order.userId = user.id
            order.boatId = boat.id
            order.userEmail = user.email
            return order
        }catch (e) {
            console.log('Ошибка при создании заказа');
        }
    }

    async getAll():Promise<Order[]>{
        try {
            const orders = await this.orderRepository.findAll();
            return orders;
        } catch (e) {
            console.log('Ошибка при выводе заказов')
        }
    }
}
