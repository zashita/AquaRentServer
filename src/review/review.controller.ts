import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Order} from "../order/order.model";
import {UserService} from "../user/user.service";
import {BoatService} from "../boat/boat.service";
import {OrderCreationDto} from "../order/dto/OrderCreation.dto";
import {Review} from "./review.model";
import {ReviewCreationDto} from "./dto/reviewCreation.dto";
import {OrderService} from "../order/order.service";
import {ReviewService} from "./review.service";

@Controller('review')
export class ReviewController {
    constructor(private reviewService: ReviewService) {
    }

    @Post()
    async create(@Body() dto: ReviewCreationDto):Promise<Review>{
            return await this.reviewService.create(dto);
        }


    @Get()
    async getAll(): Promise<Review[]>{
        return await this.reviewService.getAll();
    }

    @Delete('/:id')
    async deleteById(@Param('id') id: string){
        return await this.reviewService.deleteById(id);
    }

    @Put()
    async addAnswer(@Body() answer: {id: string, text: string}){
        console.log(answer.text)
        return await this.reviewService.addAnswer(answer.id, answer.text);
    }

    @Get('/userIsCustomer')
    async getIsCustomer(@Body() userData: {userId: string, boatId: string}){
        return await this.reviewService.isCustomer(userData.userId, userData.boatId)
    }
}
