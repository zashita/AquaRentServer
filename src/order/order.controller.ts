import {Body, Controller, Get, Post} from '@nestjs/common';
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
}
