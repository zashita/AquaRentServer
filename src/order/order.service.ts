import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Order, OrderStates} from "./order.model";
import {OrderCreationDto} from "./dto/OrderCreation.dto";
import {UserService} from "../user/user.service";
import {BoatService} from "../boat/boat.service";
import {MailService} from "../mail/mail.service";

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order) private orderRepository: typeof Order,
                                    private userService: UserService,
                                    @Inject(forwardRef(() => BoatService))
                                    private boatService: BoatService,
                                    private mailService: MailService
    ) {
    }

    async create(dto: OrderCreationDto): Promise<Order>{
        try{
            console.log("DTO")
            const user = await this.userService.getUserById(dto.userId);
            const boat = await this.boatService.getBoatById(dto.boatId);
            const orders = await this.orderRepository.findAll({include: {all: true}});
            if(!await this.checkOrderDates(dto.date, dto.dateEnd))
            {
                throw new Error('Судно уже забронировано на этот день')
            }

            if((dto.dateEnd - dto.date) < 3600 || dto.dateEnd - dto.date > 172800){
                throw new Error('Минимальное время аренды - 1 час, максимальное - 48 часов')
            }
            if(orders.find((order)=> boat.userId === dto.userId)){
                throw new Error('Нельзя заказать свою лодку')
            }

            const price = boat.price * ((dto.dateEnd - dto.date) / 3600)
            const order = await this.orderRepository.create({...dto, userEmail: user.email, price});

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
            console.log(e.message)
            if(e.message === 'Судно уже забронировано на этот день'){
                throw new HttpException(e.message, 405)
            }
            if(e.message === 'Нельзя заказать свою лодку'){
                throw new HttpException(e.message, 406)
            }
            if (e.message === 'Минимальное время аренды - 1 час, максимальное - 48 часов'){
                throw new HttpException(e.message, 403)
            }
        }
    }

    async checkOrderDates(newDate: number, newDateEnd: number){
        const orders = await this.orderRepository.findAll();
        return !orders.find((order) =>
            ((newDate >= order.date && newDate <= order.dateEnd)
            ||
            (newDateEnd >= order.date && newDateEnd <= order.dateEnd)
            || newDate <= order.date && newDateEnd >= order.dateEnd)&&order.state !== OrderStates.FINISHED);
    }

    async getAll():Promise<Order[]>{
        try {
            const orders = await this.orderRepository.findAll({order: [['id' , 'DESC']]});
            return orders;
        } catch (e) {
            console.log('Ошибка при выводе заказов')
        }
    }

    async getUserBoatsOrders(userId: string){
        const orders = await this.orderRepository.findAll({include:{all: true},
            order:[['id' , 'DESC']]})
        const userOrders = orders.filter((order)=> order.boat.userId === userId && order.state !== OrderStates.FINISHED)
        return userOrders


    }

    async updateOrderState(id: string){
        const order = await this.orderRepository.findOne({where: {id}})
        if(order.state === OrderStates.WAITING){
            order.state = OrderStates.CONFIRMED;
            await order.save();
            await this.mailService.sendMail(order.userEmail, `Арендодатель подтвердил ваш заказ`)

            return order
        }
        if(order.state === OrderStates.CONFIRMED){
            order.state = OrderStates.FINISHED;
            await order.save();
            await this.mailService.sendMail(order.userEmail, `Арендодатель завершил ваш заказ`)
            return order
        }
        else return order
    }
}
