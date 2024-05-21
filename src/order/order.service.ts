import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Order, OrderStates} from "./order.model";
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
            console.log("DTO", dto)
            const user = await this.userService.getUserById(dto.userId);
            const boat = await this.boatService.getBoatById(dto.boatId);
            const orders = await this.orderRepository.findAll({include: {all: true}});
            if(orders.find((order)=> order.date === dto.date && order.boatId === dto.boatId))
            {
                throw new Error('Судно уже забронировано на этот день')
            }
            if(orders.find((order)=> boat.userId === dto.userId)){
                throw new Error('Нельзя заказать свою лодку')
            }
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
            console.log(e);
            throw new HttpException("Судно уже забронировано на этот день", HttpStatus.BAD_REQUEST)
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

    async getUserBoatsOrders(userId: string){
        const orders = await this.orderRepository.findAll({include:{all: true}})
        const userOrders = orders.filter((order)=> order.boat.userId === userId)
        return userOrders


    }

    async updateOrderState(id: string){
        const order = await this.orderRepository.findOne({where: {id}})
        if(order.state === OrderStates.WAITING){
            order.state = OrderStates.CONFIRMED;
            await order.save();
            return order
        }
        if(order.state === OrderStates.CONFIRMED){
            order.state = OrderStates.FINISHED;
            await order.save();
            return order
        }
        else return order
    }
}
