import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserCreationDto} from "./dto/userCreation.dto";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {
    }
    // @Post()
    // async create(@Body() dto: UserCreationDto){
    //     console.log(dto)
    //     return this.userService.createUser(dto)
    // }
    // @Post('/admin')
    // async createAdmin(@Body() dto: UserCreationDto){
    //     console.log(dto)
    //     return this.userService.createAdmin(dto)
    // }

    @Get()
    async getAll(){
        return this.userService.getAllUsers()
    }

    @Put('/seller/:id')
    async makeSeller(@Param('id') id: string){
        return this.userService.setSeller(id)
    }

    @Get('/:id')
    async getUserProfile(@Param('id') id: string){
        return this.userService.getUserProfile(id);
    }

    @Delete('/:id')
    async deleteUserById(@Param('id') id: string){
        return this.userService.deleteUserById(id)
    }


}
