import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {OrderService} from "./order.service";
import {OrderCreationDto} from "./dto/OrderCreation.dto";
import {Order} from "./order.model";

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {
    }

    @Post()
    async create(@Body() dto: OrderCreationDto):Promise<Order>{
        return await this.orderService.create(dto);
    }

    @Get()
    async getAll(): Promise<Order[]>{
        return await this.orderService.getAll();
    }

    @Get('/user/:id')
    async getUserBoatsOrders(@Param('id') id: string){
        return await this.orderService.getUserBoatsOrders(id);
    }

    @Put('update/:id')
    async updateOrderState(@Param('id') id: string){
        return await this.orderService.updateOrderState(id)
    }
}
