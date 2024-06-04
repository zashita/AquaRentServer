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
            const reviews = await this.reviewRepository.findAll()
            if(! await this.isCustomer(dto.userId, dto.boatId)){
                throw new Error('Нет полномочий')
            }
            if(reviews.find((review)=> review.userId === dto.userId && review.boatId === dto.boatId)){
                throw new Error('Уже оставлял')
            }
            const review = await this.reviewRepository.create({...dto, userEmail: user.email});
            if(!user || !boat){
                throw new Error('User not found')
            }

            review.userId = user.id
            review.boatId = boat.id
            review.userEmail = user.email
            await review.save()
            boat.reviews?.push(review)
            await boat.save();
            return review
        }catch (e) {
            if(e.message === 'Нет полномочий'){
                throw new HttpException(e, 405)
            }

            if(e.message === 'Уже оставлял'){
                throw new HttpException(e, 406)
            }

            else throw new HttpException(e, 407)


        }
    }

    async deleteById(id: string){
        const review = await this.reviewRepository.destroy({where: {id}})
        return review;
    }

    async addAnswer(id: string, text: string){
        const review = await this.reviewRepository.findOne({where: {id}})
        review.answer = text;
        await review.save();
        return review;
    }
    async isCustomer(userId: string, boatId: string){
        const user = await this.userService.getUserById(userId);
        if (
            user.orders?.find
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
