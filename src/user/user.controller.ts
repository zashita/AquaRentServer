import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserCreationDto} from "./dto/userCreation.dto";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {
    }
    @Post()
    async create(@Body() dto: UserCreationDto){
        console.log(dto)
        return this.userService.createUser(dto)
    }

    @Get()
    async getAll(){
        return this.userService.getAllUsers()
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
