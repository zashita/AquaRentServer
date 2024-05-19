import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Review} from "./review.model";
import {UserService} from "../user/user.service";
import {BoatService} from "../boat/boat.service";
import {ReviewCreationDto} from "./dto/reviewCreation.dto";
import {or} from "sequelize";
import {OrderStates} from "../order/order.model";

@Injectable()
export class ReviewService {
    constructor(@InjectModel(Review) private reviewRepository: typeof Review,
                private userService: UserService,
                private boatService: BoatService,
    ) {
    }

    async create(dto: ReviewCreationDto): Promise<Review>{
        try{
            const user = await this.userService.getUserById(dto.userId);
            const boat = await this.boatService.getBoatById(dto.boatId);
            const review = await this.reviewRepository.create({...dto, userEmail: user.email});
            if(!user || !boat){
                throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
            }
            await boat.$add('reviews', [review.id])
            await user.$add('reviews', [review.id])
            review.userId = user.id
            review.boatId = boat.id
            review
            return review
        }catch (e) {
            console.log('Ошибка при создании заказа');
        }
    }
    async isCustomer(userId: string, boatId: string){
        const user = await this.userService.getUserById(userId);
        if (
            user.orders.find
            (
                (order) => order.state === OrderStates.FINISHED && order.boatId === boatId
            )
        ) return true;
        return false
    }

    async getAll():Promise<Review[]>{
        try {
            const reviews = await this.reviewRepository.findAll();
            return reviews;
        } catch (e) {
            console.log('Ошибка при выводе заказов')
        }
    }
}
