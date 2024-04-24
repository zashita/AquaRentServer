import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../user/user.model";
import {Order} from "./order.model";
import {OrderCreationDto} from "./dto/OrderCreation.dto";

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order) private orderRepository: typeof Order) {
    }

    async create(dto: OrderCreationDto): Promise<Order>{
        try{
            const order = await this.orderRepository.create(dto);
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
