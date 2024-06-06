import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {UserCreationDto} from "./dto/userCreation.dto";
import {RoleService} from "../role/role.service";
import {Order} from "../order/order.model";
import {OrderService} from "../order/order.service";
import {FilesService} from "../files/files.service";
import {Boat} from "../boat/boat.model";

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                @InjectModel(Order) private orderRepository: typeof Order,
                @InjectModel(Boat) private boatRepository: typeof Boat,
                private roleService: RoleService,
                private fileService: FilesService
               ) {
    }

    async createUser(dto: UserCreationDto){
        try {
            const user = await this.userRepository.create(dto)
            console.log(dto)
            const userRole = await this.roleService.getRoleByValue('USER')

            await user.$set('roles', [userRole.id]);
            console.log(user)
            user.roles = [userRole]



            return user;
        }
        catch (e) {
            console.log(`${e} Ошибка при создании пользователя`)
        }
    }

    async createAdmin(dto: UserCreationDto){
        try {
            const user = await this.userRepository.create(dto)
            console.log(dto)
            const roles = await this.roleService.getAll()
            const rolesId = roles.map((role)=> role.id)

            await user.$set('roles', rolesId);
            console.log(user)
            user.roles = roles
            return user;
        }
        catch (e) {
            console.log(`${e} Ошибка при создании пользователя`)
        }
    }

    async changePicture(id: string, image: File){
        console.log(image)
        const imagePath = await this.fileService.createFile(image);
        const user = await this.userRepository.findOne({where: {id}})
        user.picture = imagePath;
        await user.save();
        return user

    }

    async getNotConfirmed(){
        try {
            const users = await this.userRepository.findAll({include: {all: true},
                order: [['id' , 'DESC']],
                where:{waitingForStatusConfirmation: true}})
            return users.map((user)=>{
                return{
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                    orders: user.orders,
                    boats: user.boats,
                    roles: user.roles,
                    waitingForStatusConfirmation: user.waitingForStatusConfirmation


                }

            });
        } catch (e) {

        }
    }

    async getAllUsers(){
        try {
            const users = await this.userRepository.findAll({
                order: [['id' , 'DESC']],
                include: {all: true}})
            return users.map((user)=>{
                return{
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                    orders: user.orders,
                    boats: user.boats,
                    roles: user.roles,
                    waitingForStatusConfirmation: user.waitingForStatusConfirmation
                }

            });
        }
        catch (e) {
            console.log(`${e} Ошибка при выводе всех пользователя`)
        }
    }

    async getUserByEmail(email: string){
        const user = this.userRepository.findOne({where: {email}, include: {all: true}})
        return user;
    }
    async getUserById(id: string){
        const user = this.userRepository.findOne({where: {id}, include: {all: true}})
        return user;
    }

    async getUserProfile(id: string){
        const user = await this.userRepository.findOne({where: {id}, include: {all: true}})
        return{
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            picture: user.picture,
            orders: user.orders,
            boats: user.boats,
            roles: user.roles,
            waitingForStatusConfirmation: user.waitingForStatusConfirmation


        }
    }
    async deleteUserById(id: string){
        const user = await this.userRepository.findOne({where:{id}})
        const orders = await this.orderRepository.destroy({where: {userId: user.id}})
        const boats = await this.boatRepository.findAll({where: {userId: user.id}})
        boats.map((boat) => {
            const orders =  this.orderRepository.destroy({where: {boatId: boat.id}})
        })
        await this.boatRepository.destroy({where: {userId: user.id}})
        await user.destroy();
        return user
    }

    async setSeller(id: string){
        const user = await this.userRepository.findOne({where: {id}, include: {all: true}})
        if(!user.roles.find((role)=> role.value === 'SELLER')){
            const sellerRole = await this.roleService.getRoleByValue('SELLER')
            await user.$add('roles', [sellerRole.id])
            user.roles.push(sellerRole)
        }
        return user
    }

    async setUserWaitingForStatusConfirmationTrue(id: string){
        const user = await this.userRepository.findOne({where: {id}})
        user.waitingForStatusConfirmation = true;
        await user.save()
        return user;
    }

    async setUserWaitingForStatusConfirmationFalse(id: string){
        const user = await this.userRepository.findOne({where: {id}})
        user.waitingForStatusConfirmation = false;
        await user.save()
        return user;
    }

}
